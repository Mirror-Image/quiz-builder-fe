import Link from "next/link";

interface ILinkCellProps {
  href: string
  label: string
}

export default function LinkCell({ href, label }: ILinkCellProps) {
  return (
    <Link className='hover:text-yellow-500' href={href}>{label}</Link>
  )  
}