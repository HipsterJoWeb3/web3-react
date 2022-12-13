import {setCookie, destroyCookie, parseCookies} from 'nookies'

export const useGetCookie = (name: string) => {
    const cookies = parseCookies()
    return cookies[name]
}

export const useSetCookie = (name: string, value: string) => {
    setCookie(null, name, value, {
        maxAge: 30 * 24 * 60 * 60,
    })
}

export const useDestroyCookie = (name: string) => {
    destroyCookie(null, name)
}
