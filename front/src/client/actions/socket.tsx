export const SOCKET_POP = 'SOCKET_POP'

export const setSocket = (value: any) => {
  return {
    type: SOCKET_POP,
    value
  }
}
