import { useEffect, useState } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Função para verificar se é mobile baseado no tamanho da tela
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Verificar inicialmente
    checkIsMobile()
    
    // Adicionar listener para redimensionamento
    window.addEventListener("resize", checkIsMobile)
    
    // Limpar listener quando componente desmontar
    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  return isMobile
} 