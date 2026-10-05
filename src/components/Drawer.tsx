import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
export default function Drawer({title,onClose,children,wide=false}:{title:string;onClose:()=>void;children:ReactNode;wide?:boolean}){
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const el=ref.current;const prior=document.activeElement as HTMLElement;el?.showModal();return()=>{el?.close();prior?.focus();};},[]);
 return <dialog ref={ref} className={'drawer '+(wide?'wide':'')} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===ref.current)onClose();}}><div className="drawer-inner"><header><p className="eyebrow">CUADERNO DE RECORRIDO</p><button aria-label="Cerrar panel" onClick={onClose}><X size={22}/></button></header><h2>{title}</h2>{children}</div></dialog>;
}
