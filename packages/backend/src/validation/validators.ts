import _ from 'validator'
import joi from 'joi'
import logger from '../logger'
import { ChannelMessage, PublicChannel } from '@quiet/state-manager'
const log = logger('validators')

const messageSchema = joi.object({
  id: joi.string().required(),
  type: joi.number().required().positive().integer(),
  message: joi.alternatives(joi.string(), joi.binary()).required(),
  media: joi.object({
    path: joi.string().allow(null),
    name: joi.string().required(),
    ext: joi.string().required(),
    cid: joi.string().required(),
    message: joi.object({
      id: joi.string().required(),
      channelAddress: joi.string().required()
    })
  }),
  createdAt: joi.number().required(),
  channelAddress: joi.string().required(),
  signature: joi.string().required(),
  pubKey: joi.string().required()
})

const channelSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  owner: joi.string().required(),
  timestamp: joi.number().required(),
  address: joi.string().required()
})

export const isUser = (publicKey: string, halfKey: string): boolean => {
  return (
    publicKey.length === 66 &&
    halfKey.length === 64 &&
    _.isHexadecimal(publicKey) &&
    _.isHexadecimal(halfKey)
  )
}

export const isConversation = (publicKey: string, encryptedPhrase: string): boolean => {
  return (
    publicKey.length === 64 &&
    _.isHexadecimal(publicKey) &&
    _.isBase64(encryptedPhrase)
  )
}

export const isDirectMessage = (msg: string): boolean => {
  return msg.length >= 364 && _.isBase64(msg)
}

export const isMessage = (msg: ChannelMessage): boolean => {
  const value = messageSchema.validate(msg)
  if (value.error) log.error('isMessage', value.error)
  return !value.error
}

export const isChannel = (channel: PublicChannel): boolean => {
  const value = channelSchema.validate(channel)
  return !value.error
}

export default {
  isUser,
  isMessage,
  isDirectMessage,
  isChannel,
  isConversation
}
