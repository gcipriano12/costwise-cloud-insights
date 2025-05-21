
import * as React from "react"

export const SIDEBAR_WIDTH = "280px"
export const SIDEBAR_WIDTH_ICON = "56px"
export const SIDEBAR_WIDTH_MOBILE = "270px"

export interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
}

interface SidebarContextProps {
  state: "open" | "collapsed"
  setState: React.Dispatch<React.SetStateAction<"open" | "collapsed">>
  openMobile: boolean
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>
  toggleSidebar: () => void
  isMobile: boolean
}

const SidebarContext = React.createContext<SidebarContextProps | undefined>(
  undefined
)

export function SidebarProvider({
  children,
  defaultOpen = false,
}: SidebarProviderProps) {
  const [state, setState] = React.useState<"open" | "collapsed">(
    defaultOpen ? "open" : "collapsed"
  )
  const [openMobile, setOpenMobile] = React.useState(false)
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  )

  const isMobile = windowWidth < 768

  React.useEffect(() => {
    if (typeof window === "undefined") return

    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  React.useEffect(() => {
    document.documentElement.style.setProperty("--sidebar-width", SIDEBAR_WIDTH)
    document.documentElement.style.setProperty(
      "--sidebar-width-icon",
      SIDEBAR_WIDTH_ICON
    )
    document.documentElement.style.setProperty(
      "--sidebar-width-mobile",
      SIDEBAR_WIDTH_MOBILE
    )
  }, [])

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((open) => !open)
    } else {
      setState((state) => (state === "open" ? "collapsed" : "open"))
    }
  }, [isMobile])

  return (
    <SidebarContext.Provider
      value={{
        state,
        setState,
        openMobile,
        setOpenMobile,
        toggleSidebar,
        isMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

// Add sidebar CSS variables to the :root
if (typeof document !== "undefined") {
  document.documentElement.style.setProperty("--sidebar-width", SIDEBAR_WIDTH)
  document.documentElement.style.setProperty(
    "--sidebar-width-icon",
    SIDEBAR_WIDTH_ICON
  )
  document.documentElement.style.setProperty(
    "--sidebar-width-mobile",
    SIDEBAR_WIDTH_MOBILE
  )
}
