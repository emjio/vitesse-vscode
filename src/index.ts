import { message } from '@vscode-use/utils'
import type { Disposable, ExtensionContext } from 'vscode'

export function activate(context: ExtensionContext) {
  const disposes: Disposable[] = []

  message.info('Hello')
  context.subscriptions.push(...disposes)
}

export function deactivate() {

}
