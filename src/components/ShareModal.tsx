"use client"
import { useState } from "react";
import { TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";

interface ModalProps {
  ignoreOverlayClicks?: boolean;
  header?: React.ReactNode
  footer?: React.ReactNode
  contentClassName?: string
  children: React.ReactNode;
  open: boolean;
  setOpen: (e: boolean) => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ open, setOpen, children, header, contentClassName, footer, ignoreOverlayClicks = false, className }) => {
  return (
    <div
      style={{ display: open ? "flex" : "none" }}
      onClick={() => !ignoreOverlayClicks && setOpen(false)}
      className={`modal fixed w-screen min-h-full left-0 top-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] justify-center items-center z-50 ${className}`}>
      <div
        onClick={e => e.stopPropagation()}
        className={`modal-content w-auto p-5 flex flex-col ${contentClassName} max-h-[800px] overflow-scroll`}>

        {!!header && <div className="modal-header border-b">
          {header}
        </div>
        }

        {children}

        <div className="modal-body"></div>
        {!!footer && <div className="modal-footer">
          {footer}
        </div>
        }

      </div>
    </div>
  )
}


const ShareModal: React.FC<{ isOpen: boolean, setIsOpen: (s: boolean) => void, url: string }> = ({ url, isOpen, setIsOpen }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return <Modal open={isOpen} setOpen={setIsOpen}>
    <div className="flex flex-col bg-white rounded-md text-black py-5 gap-8 px-24">
      <h3 className="text-xl text-center">Share using social media</h3>
      <div className="flex flex-row justify-between w-full items-center my-2">
        <div className="bg-white rounded-full">
          <WhatsappShareButton url={url} className="rounded-full shadow-lg hover:opacity-80 transition-all">
            <WhatsappIcon size={50} className="rounded-full" />
          </WhatsappShareButton>
        </div>

        <div className="">
          <TelegramShareButton url={url} className="rounded-full shadow-lg  hover:opacity-80 transition-all">
            <TelegramIcon size={50} className="rounded-full" />
          </TelegramShareButton>
        </div>

        <div className="">
          <TwitterShareButton url={url} className="rounded-full shadow-lg hover:opacity-80 transition-all">
            <TwitterIcon size={50} className="rounded-full" />
          </TwitterShareButton>
        </div>
      </div>

      <div className="flex flex-row gap-3">
        <input type="text" value={url} disabled className="bg-[#eeeeee] px-2 py-2 rounded-md" />
        <button
          onClick={handleCopy}
          className={`
          ${copied ? "bg-green-400 text-white" : "bg-[#eeeeee] text-black"}
           rounded-md py-2 px-4 font-bold transition-all hover:opacity-80`}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  </Modal >
}

export default ShareModal
