import { useEffect, useState } from "react"

const option = {
    root:null,
    rootMargin:'0px',
    threshold:0.8
}
export const useVisible = (targetRef)=>{
    const [isVisible,setIsVisible] = useState(false)
    const setIsVisibleCallback=([entry])=>{
        if(entry.isIntersecting)setIsVisible(entry.isIntersecting)
    }
useEffect(()=>{
   const observer = new IntersectionObserver(
    setIsVisibleCallback,
    option);
    if(targetRef.current){
        observer.observe(targetRef.current);
    }

    return ()=>{
        if(targetRef.current){
            observer.observe(targetRef.current)
        }
    }
},[])
return isVisible
}