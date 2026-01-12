import Link from "next/link"

export function SidebarLogo() {
  return (
    <Link href="/dashboard" className="flex items-center px-3 py-4">
      <span className="text-2xl font-semibold text-foreground">
        P<span className="text-xs align-top">x</span>
      </span>
    </Link>
  )
}
