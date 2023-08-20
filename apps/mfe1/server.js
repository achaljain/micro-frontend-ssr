import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const isTest = process.env.VITEST

process.env.MY_CUSTOM_SECRET = 'API_KEY_qwertyuiop'

export async function createServer(
    root = process.cwd(),
    isProd = process.env.NODE_ENV === 'production',
    hmrPort,
) {
    const resolve = (p) => path.resolve(__dirname, p)

    //   const indexProd = isProd
    //     ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    //     : ''
    // const indexProd = ''

    const app = express()

    /**
     * @type {import('vite').ViteDevServer}
     */
    let vite
    if (!isProd) {
        vite = await (
            await import('vite')
        ).createServer({
            root,
            logLevel: isTest ? 'error' : 'info',
            server: {
                middlewareMode: true,
                watch: {
                    // During tests we edit the files too fast and sometimes chokidar
                    // misses change events, so enforce polling for consistency
                    usePolling: true,
                    interval: 100,
                },
                hmr: {
                    port: hmrPort,
                },
            },
            appType: 'custom',
        })
        // use vite's connect instance as middleware
        app.use(vite.middlewares)
    } else {
        app.use(cors())
        app.use((await import('compression')).default())
        app.use(
            (await import('serve-static')).default(resolve('dist/client'), {
                index: false,
            }),
        )
        app.use(
            (await import('serve-static')).default(resolve('dist/server/assets'), {
                index: false,
            }),
        )
    }

    app.use('/assets', express.static(resolve('dist/server/assets')))

    app.use('/ssr', async (req, res) => {
        try {
            const { render } = await import('./dist/server/server.js')
            const appHtml = render()
            res.status(200).set({ 'Content-Type': 'text/html' }).end(appHtml)
        } catch (error) {
            console.error("SSR VITE ERROR ", error)
        }
    })

    app.use('*', async (req, res) => {
        try {
            // const url = req.originalUrl

            // let template, render
            // if (!isProd) {
            //     // always read fresh template in dev
            //     template = fs.readFileSync(resolve('index.html'), 'utf-8')
            //     template = await vite.transformIndexHtml(url, template)
            //     render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
            // } else {
            //     template = indexProd
            //     render = (await import('./dist/server/entry-server.js')).render
            // }

            // const context = {}
            // const appHtml = render(url, context)

            // if (context.url) {
            //     // Somewhere a `<Redirect>` was rendered
            //     return res.redirect(301, context.url)
            // }

            // const html = template.replace(`<!--app-html-->`, appHtml)

            res.status(200).send('OK')
        } catch (e) {
            !isProd && vite.ssrFixStacktrace(e)
            console.log(e.stack)
            res.status(500).end(e.stack)
        }
    })

    return { app, vite }
}

if (!isTest) {
    createServer().then(({ app }) =>
        app.listen(4173, () => {
            console.log('http://localhost:4173')
        }),
    )
}