
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { spawnSync } from 'child_process';
import { errorMessage } from 'src/error';
import { v4 as v4uuid } from 'uuid';
import * as precise from 'precise'
import * as path from 'path'
export const pythoncompiler = (dir: string, body: any) => {
    var fileName = path.join(dir, `${v4uuid()}.py`)

    try {
        if (!existsSync(dir)) {
            mkdirSync(dir);
        }

        if (!existsSync(fileName)) {
            writeFileSync(fileName, body?.script)
        }
        let timer = precise().start()
        const scriptExecution = spawnSync('python', [fileName], {
            input: body?.input
        })
        if (timer.stop().diff() / 1000000 > 30) {
            return errorMessage('ACCEPTED', "Time limit exceeded")
        }
        if (scriptExecution.status === 0) {

            return { message: scriptExecution.stdout.toString().trim() }
        } else {
            let error = scriptExecution.stderr.toString().trim().replace(fileName, 'Solution.py')
            return errorMessage('ACCEPTED', error)
        }
    } catch (error) {
        error = error.replace(fileName, 'Python.py')
        return errorMessage('INTERNAL_SERVER_ERROR', error)
    }
}