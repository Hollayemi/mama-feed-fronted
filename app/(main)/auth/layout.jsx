"use client";
import AuthLayout from "@/app/components/layouts/AuthLayouts";
import { usePathname } from 'next/navigation';

export const metadata = {
  title: "auth - Mama Feed",
  description: "Showcase your store now",
};
const config = {
  login: { image: "/images/more/auth-baby.png", reverse: true },
  create_account: { image: "/images/more/auth-woman.png" },
  forgot_password: { image: "/images/more/auth-baby.png", reverse: true },
  reset_password: { image: "/images/more/auth-baby.png", reverse: true },
  verify_mail: { image: "/images/more/auth-woman.png" },
};

export default function MyAuthLayout({ children }) {
    const pathname = usePathname();
      const path = pathname.split('/').pop()
      const realPath = path.split('?')[0].replaceAll('-', '_')
    return (
        <AuthLayout {...config[realPath]}>
            {children}
        </AuthLayout>
    )
}
