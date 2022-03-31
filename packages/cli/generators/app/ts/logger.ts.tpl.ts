import { generator, renderTemplate, toFile } from '@feathershq/pinion'
import { AppGeneratorContext } from '../index'

const template = ({}: AppGeneratorContext) =>
`import { createLogger, format, transports } from 'winston'
import { HookContext, NextFunction } from './declarations'

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
export const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.combine(
    format.splat(),
    format.simple()
  ),
  transports: [
    new transports.Console()
  ]
})

export const logErrorHook = async (context: HookContext, next: NextFunction) => {
  try {
    await next()
  } catch (error) {
    logger.error(error)
    throw error
  }
}
`

export const generate = (ctx: AppGeneratorContext) => generator(ctx)
  .then(renderTemplate(template, toFile(({ lib }: AppGeneratorContext) => lib, 'logger.ts')))