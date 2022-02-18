
import { spawnSync } from 'child_process';
import * as precise from 'precise'
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as path from 'path'
import { errorMessage } from 'src/error';

export const gppcompiler = (dir: string, body: any) => {

    try {
        var className = 'Solution'
        if (!existsSync(dir)) {
            mkdirSync(dir);
        }
        var fileName = path.join(dir, className)
        if (!existsSync(`${fileName}.cpp`)) {
            writeFileSync(`${fileName}.cpp`, body?.script)
        }
        let scriptCompile = spawnSync('gcc', [`${fileName}.cpp`, '-lstdc++', '-o', fileName], {
            timeout: 5000
        })
        if (scriptCompile.status === 0) {
            let timer = precise().start()
            let scriptExecution = spawnSync(fileName, {
                input: body?.input,
            })

            if (timer.stop().diff() / 1000000 > 30) {
                return errorMessage('ACCEPTED', "Time limit exceeded")
            }

            if (scriptExecution.status === 0) {
                return { message: scriptExecution.stdout.toString().trim() }
            } else {
                let error = scriptExecution.stderr.toString().split(`${dir}\\`).join('')

                return errorMessage('ACCEPTED', error)
            }
        } else {
            let error = scriptCompile.stderr.toString().split(`${dir}\\`).join('')

            return errorMessage('ACCEPTED', error)
        }

    } catch (error) {
        // error = `${error}`.split(`${dir}\\`).join('')

        return errorMessage('INTERNAL_SERVER_ERROR', `${error}`)
    }
}