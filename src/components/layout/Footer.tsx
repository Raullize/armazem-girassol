import React from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import { Mail, Phone, Flower2 } from 'lucide-react';
import { FaInstagram, FaWhatsapp, FaFacebookF, FaYoutube, FaCcVisa, FaCcMastercard, FaBarcode } from 'react-icons/fa';
import { FaPix } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="w-full mt-auto flex flex-col">
      {/* Newsletter Section */}
      <div className="bg-[#2E8B57] py-8 border-b-4 border-amber-500">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-white">
              <Mail className="w-12 h-12 stroke-[1.5]" />
              <div>
                <h2 className="text-xl font-bold font-serif leading-tight">
                  Cadastre-se e receba ofertas exclusivas,
                </h2>
                <p className="text-sm opacity-90">
                  dicas e receitas para uma vida mais saudável e equilibrada
                </p>
              </div>
            </div>
            <div className="flex w-full md:w-auto gap-3 flex-col sm:flex-row">
              <input 
                type="text" 
                placeholder="Nome" 
                className="px-4 py-2.5 rounded-md bg-[#236a42] border border-[#3b9c67] text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full sm:w-48"
              />
              <input 
                type="email" 
                placeholder="E-mail" 
                className="px-4 py-2.5 rounded-md bg-[#236a42] border border-[#3b9c67] text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full sm:w-64"
              />
              <button 
                type="button" 
                className="bg-[#FDBA24] hover:bg-yellow-400 text-amber-950 font-bold px-6 py-2.5 rounded-md transition-colors uppercase text-sm tracking-wider shadow-sm"
              >
                Eu quero
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Content Wrapper */}
      <div className="bg-[#FCF9EE]/90 backdrop-blur-sm">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            
            {/* Col 1: Brand & Social */}
            <div className="flex flex-col">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Flower2 className="w-8 h-8 text-[#2E8B57]" />
                <div className="flex flex-col leading-none">
                  <span className="text-2xl font-bold text-[#2E8B57] font-serif">Armazém</span>
                  <span className="text-1xl font-bold text-amber-500 tracking-[0.2em] font-serif">Girassol</span>
                </div>
              </Link>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Desde 2018, o Armazém Girassol tem o propósito de levar mais saúde, sabor e qualidade para o seu dia a dia. Somos apaixonados por alimentos naturais e acreditamos que boas escolhas começam com ingredientes verdadeiros.
              </p>
              <div>
                <span className="text-xs font-bold text-[#2E8B57] tracking-wider uppercase mb-3 block">Redes Sociais</span>
                <div className="flex gap-3">
                  <a href="#" className="w-8 h-8 rounded-full bg-[#2E8B57] text-white flex items-center justify-center hover:bg-amber-500 transition-colors"><FaFacebookF className="w-4 h-4" /></a>
                  <a href="#" className="w-8 h-8 rounded-full bg-[#2E8B57] text-white flex items-center justify-center hover:bg-amber-500 transition-colors"><FaInstagram className="w-4 h-4" /></a>
                  <a href="#" className="w-8 h-8 rounded-full bg-[#2E8B57] text-white flex items-center justify-center hover:bg-amber-500 transition-colors"><FaYoutube className="w-4 h-4" /></a>
                </div>
              </div>
            </div>

            {/* Col 2: Institucional */}
            <div>
              <h3 className="text-sm font-bold text-[#2E8B57] tracking-wider uppercase mb-5">Institucional</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><Link href="/about" className="hover:text-amber-600 transition-colors">Sobre Nós</Link></li>
                <li><Link href="#" className="hover:text-amber-600 transition-colors">Armazém Girassol é confiável?</Link></li>
                <li><Link href="#" className="hover:text-amber-600 transition-colors">Sua Compra Segura</Link></li>
                <li><Link href="#" className="hover:text-amber-600 transition-colors">Política de Frete</Link></li>
                <li><Link href="#" className="hover:text-amber-600 transition-colors">Política de Troca e Devolução</Link></li>
                <li><Link href="/faq" className="hover:text-amber-600 transition-colors">Dúvidas Frequentes</Link></li>
                <li><Link href="/privacy" className="hover:text-amber-600 transition-colors">Política de Privacidade</Link></li>
              </ul>
            </div>

            {/* Col 3: Atendimento */}
            <div>
              <h3 className="text-sm font-bold text-[#2E8B57] tracking-wider uppercase mb-5">Atendimento</h3>
              <div className="space-y-5 text-sm text-gray-600">
                <div>
                  <span className="block mb-1">Compre por telefone</span>
                  <div className="flex items-center gap-2 text-[#2E8B57] font-bold">
                    <Phone className="w-4 h-4" />
                    <span>(51) 3653-1245</span>
                  </div>
                </div>
                <div>
                  <span className="block mb-1">Fale no WhatsApp</span>
                  <div className="flex items-center gap-2 text-[#2E8B57] font-bold">
                    <FaWhatsapp className="w-4 h-4" />
                    <span>(51) 99999-9999</span>
                  </div>
                </div>
                <div>
                  <span className="block mb-1">Envie um e-mail</span>
                  <div className="flex items-center gap-2 text-[#2E8B57] font-bold">
                    <Mail className="w-4 h-4" />
                    <span>contato@armazemgirassol.com.br</span>
                  </div>
                </div>
                <div className="pt-2">
                  <span className="block font-bold text-gray-800 mb-1">Horário de Atendimento</span>
                  <span className="text-xs">Segunda a Sexta das 9h às 18h<br/>Sábado das 9h às 12h</span>
                </div>
              </div>
            </div>

            {/* Col 4: Pagamento */}
            <div>
              <div className="mb-8">
                <h3 className="text-sm font-bold text-[#2E8B57] tracking-wider uppercase mb-4">Formas de Pagamento</h3>
                <div className="flex flex-wrap gap-3 text-gray-400">
                  <FaCcVisa className="w-8 h-8" />
                  <FaCcMastercard className="w-8 h-8" />
                  <FaPix className="w-8 h-8" />
                  <FaBarcode className="w-8 h-8" />
                </div>
              </div>
            </div>

          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 border-t border-black/5 text-xs text-gray-500 text-center">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-left md:text-left max-w-3xl leading-relaxed font-semibold">
              Razão Social: ARMAZEM GIRASSOL PRODUTOS NATURAIS LTDA. | CNPJ: 12.345.678/0001-90 | Endereço: Rua das Flores, 123, Centro, Charqueadas, RS - CEP 96745-000
            </p>
            <div className="flex items-center gap-4 text-gray-400 font-medium whitespace-nowrap">
              <span>
                Desenvolvido por <a href="https://depsmodels.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">DEPS Models</a>
              </span>
            </div>
          </div>
        </Container>
      </div>
    </div>
    </footer>
  );
}
