import React from 'react';
import { CreditCard, Package, Truck, ShieldCheck } from 'lucide-react';
import { FaPix } from 'react-icons/fa6';
import Container from '../ui/Container';

const features = [
  {
    icon: FaPix,
    title: '5% OFF',
    subtitle: 'pagando no PIX',
  },
  {
    icon: CreditCard,
    title: 'PARCELAMOS',
    subtitle: 'em até 3x sem juros (acima de R$150,00)',
  },
  {
    icon: Package,
    title: 'ATACADO',
    subtitle: 'Não precisa ter CNPJ',
  },
  {
    icon: Truck,
    title: 'ENTREGAMOS',
    subtitle: 'em toda região carbonífera',
  },
  {
    icon: ShieldCheck,
    title: 'Segurança',
    subtitle: 'Loja oficial',
  },
];

export default function FeaturesSection() {
  return (
    <div className="bg-transparent py-8 relative">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-8 justify-items-center">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isLucide = feature.icon !== FaPix;
            return (
              <div key={index} className="flex items-center gap-4 w-full max-w-[220px]">
                <div className="shrink-0">
                  <Icon className="w-10 h-10 text-[#2E8B57]" {...(isLucide ? { strokeWidth: 1.5 } : {})} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-amber-950 uppercase tracking-tight leading-tight">
                    {feature.title}
                  </span>
                  <span className="text-xs text-gray-500 leading-tight mt-0.5">
                    {feature.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
