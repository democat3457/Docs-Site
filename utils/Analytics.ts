import ReactGA from 'react-ga'

export const initGA = () => {
  ReactGA.initialize('UA-130251586-3')
}

export const pageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}