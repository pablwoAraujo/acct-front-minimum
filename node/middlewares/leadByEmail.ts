import { UserInputError } from '@vtex/api'

export async function leadByEmail(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { leadByEmail: leadByEmailClient },
    vtex: {
      route: { params }, 
    },
  } = ctx

  const { email } = params

  if (! email) {
    throw new UserInputError('Email is required') // Wrapper for a Bad Request (400) HTTP Error. Check others in https://github.com/vtex/node-vtex-api/blob/fd6139349de4e68825b1074f1959dd8d0c8f4d5b/src/errors/index.ts
  }

  const emailAddress = String(email).valueOf()

  console.log("email = ",email)
  
  const leadByEmailResponse = await leadByEmailClient.getLead(emailAddress)

  console.info("email = ",email)
  console.info('Status response:', leadByEmailResponse)

  // const {
  //   headers,
  //   data,
  //   status: responseStatus,
  // } = await leadByEmailClient.getLeadWithHeaders(ctx, emailAddress).catch((reason) => {
  //   return { headers: reason.response.headers, data: reason.response.data, status: reason.response.status}
  // })

  // console.info("status que retornou = ", responseStatus)

  // console.info('Lead headers', headers)
  // console.info('Lead data:', data)

  // console.log('Headers2:', headers)

  // ctx.status = responseStatus
  ctx.body = leadByEmailResponse
  ctx.set('Cache-Control', 'no-cache no-store')

  await next()
  
}