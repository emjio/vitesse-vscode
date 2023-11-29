import { addEventListener, message } from '@vscode-use/utils'
import type { Disposable, ExtensionContext } from 'vscode'
import { authentication } from 'vscode'
import { isInSponsor } from 'get-sponsors-list'
import { displayName } from '../package.json'

export async function activate(context: ExtensionContext) {
  const disposes: Disposable[] = []
  let isSponsor = false
  let session = await authentication.getSession('github', ['user:read'])
  if (session) {
    const user = session.account.label
    isSponsor = await isInSponsor(user)
    if (isSponsor)
      message.info(`尊贵的Simon的赞助者，感谢你的支持♥️`)

    else
      message.info(`${session.account.label}，您目前还不是Simon的赞助者，请赞助后再来享受插件吧～`)
  }
  else {
    message.info(`${displayName} 目前只针对sponsors服务，如需使用，请赞助我哦～`)
  }
  message.info('Hello')
  disposes.push(addEventListener('auth-change', async (name: string, getsession) => {
    if (name === 'github') {
      session = await getsession(name)
      if (session) {
        const user = session.account.label
        isSponsor = await isInSponsor(user)
        if (isSponsor)
          message.info(`尊贵的Simon的赞助者，感谢你的支持♥️`)

        else
          message.info(`${session.account.label}，您目前还不是Simon的赞助者，请赞助后再来享受插件吧～`)
      }
      else {
        isSponsor = false
      }
    }
  }))
  context.subscriptions.push(...disposes)
}

export function deactivate() {

}
