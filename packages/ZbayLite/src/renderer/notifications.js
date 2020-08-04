/* global Notification */
import { soundTypeToAudio } from '../shared/sounds'
import electronStore from '../shared/electronStore'

export const createNotification = ({ title, body }) => {
  const sound = parseInt(electronStore.get(`notificationCenter.user.sound`))
  if (sound) {
    soundTypeToAudio[sound].play()
  }
  return new Notification(title, { body: body })
}

export const displayMessageNotification = ({
  senderName,
  message,
  channelName
}) =>
  createNotification({
    title: `New message in ${channelName}`,
    body: `${senderName || 'Anonymous'}: ${message.substring(0, 64)}${
      message.length > 64 ? '...' : ''
    }`
  })

export const displayDirectMessageNotification = ({ message, username }) =>
  createNotification({
    title: `New message from ${username || 'Unnamed'}`,
    body: `${message.message.substring(0, 64)}${
      message.message.length > 64 ? '...' : ''
    }`
  })
export const offerNotification = ({ message, username }) =>
  createNotification({
    title: `New message from ${username || 'Unnamed'}`,
    body: `${message.substring(0, 64)}${message.length > 64 ? '...' : ''}`
  })

export default {
  createNotification,
  displayMessageNotification
}
