'use client';

import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ChevronDown,
  ChevronUp,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import privacyChoicesIcon from '../../../public/privacy-choices-icon.png';
import { footerData } from '../../constants/footerData';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

const socialIcons = [
  { Icon: () => <FontAwesomeIcon icon={faXTwitter} /> },
  { Icon: Linkedin },
  { Icon: Facebook },
  { Icon: Instagram },
  { Icon: Youtube },
];

const Footer = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="mt-14 flex w-full flex-col">
      <div className="grid gap-2 border-t-2 border-neutral-200 pt-10 md:grid-cols-3 md:gap-14 xl:grid-cols-5">
        {footerData.map((data, index) => (
          <div key={index} className="hidden md:block">
            <h3 className="text-sm font-semibold uppercase">{data.title}</h3>

            <div className="mt-5 flex flex-col gap-3">
              {data.items.map((item, idx) => (
                <span
                  className="cursor-pointer text-sm font-semibold text-stone-500 hover:underline hover:underline-offset-4"
                  key={idx}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}

        <div className="md:hidden">
          {footerData.map((data) => (
            <Collapsible
              key={data.title}
              open={open === data.title}
              onOpenChange={(isOpen) => setOpen(isOpen ? data.title : null)}
              className="w-full border-b border-stone-300 sm:last:border-none"
            >
              <CollapsibleTrigger className="flex h-14 w-full cursor-pointer items-center justify-between font-semibold uppercase">
                {data.title}

                {open === data.title ? (
                  <ChevronUp size={20} strokeWidth={1} />
                ) : (
                  <ChevronDown size={20} strokeWidth={1} />
                )}
              </CollapsibleTrigger>

              <CollapsibleContent className="py-4">
                <div className="flex flex-col gap-3">
                  {data.items.map((item, idx) => (
                    <span
                      className="text-sm font-semibold text-stone-500"
                      key={idx}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        <div className="flex w-fit flex-col justify-center gap-3 py-5 font-semibold text-stone-500 sm:hidden">
          <span className="cursor-pointer hover:text-black">Terms of Sale</span>
          <span className="cursor-pointer hover:text-black">Terms of Use</span>
          <span className="cursor-pointer hover:text-black">Cookie Policy</span>
          <div className="-mt-0.5 flex cursor-pointer items-center gap-1">
            <Image
              alt="Privacy choice"
              src={privacyChoicesIcon}
              className="h-6 w-7 object-contain"
              height={15}
            />

            <span className="hover:text-black">Your Privacy Choices</span>
          </div>
        </div>

        <div className="flex w-full flex-col">
          <h3 className="hidden text-sm font-semibold uppercase md:block">
            Follow Us
          </h3>

          <div className="flex justify-center gap-5 py-5 md:mt-5 md:grid md:grid-cols-3 md:justify-normal md:py-0">
            {socialIcons.map(({ Icon }, index) => (
              <div
                key={index}
                className="flex h-10 w-10 transform cursor-pointer items-center justify-center rounded-full bg-stone-900 p-2 text-white transition-transform duration-300 hover:bg-gray-300 hover:text-black"
              >
                <Icon size={22} strokeWidth={1.5} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col-reverse items-center border-t-2 border-neutral-200 font-semibold sm:mt-5 md:mt-10 xl:flex-row xl:justify-between xl:py-5">
        <span className="w-full border-t-2 border-neutral-200 py-5 text-center text-sm leading-7 text-stone-500 xl:border-0 xl:py-0 xl:text-left">
          © 2025 | Voltstep Limited | All Rights Reserved.{' '}
          <br className="sm:hidden" /> We Empower Fitness.
        </span>

        <div className="hidden w-full justify-center gap-7 py-5 text-sm text-stone-500 sm:flex xl:justify-end xl:py-0">
          <span className="cursor-pointer hover:text-black">Terms of Sale</span>
          <span className="cursor-pointer hover:text-black">Terms of Use</span>
          <div className="-mt-0.5 flex cursor-pointer items-center gap-1">
            <Image
              alt="Privacy choice"
              aria-hidden="true"
              src={privacyChoicesIcon}
              height={15}
            />

            <span className="hover:text-black">Your Privacy Choices</span>
          </div>

          <span className="cursor-pointer hover:text-black">Cookie Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
