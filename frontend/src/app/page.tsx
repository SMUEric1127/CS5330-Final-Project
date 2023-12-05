"use client";
import NavigationMain from "@/components/NavigationMain";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <NavigationMain />
      <div className="container pt-40 mx-auto">
        <div className="flex flex-col lg:flex-row text-6xl font-bold">
          <div className="flex-1 pt-20">
            Make your life easier with our application
            <div className="text-xl font-light pt-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque rutrum, nunc non tristique condimentum, tellus ligula
              feugiat nisl, a dictum metus purus eu augue. Donec elit urna,
              dictum nec mi ut, commodo scelerisque felis. Phasellus sed
              facilisis lectus. Sed id massa dolor. Integer eu ipsum tristique,
              auctor libero non, lobortis nisi. Nunc non ligula ligula. Aliquam
              vel magna pharetra, congue arcu et, scelerisque est. Nulla magna
              libero, gravida ac condimentum in, laoreet vitae tellus. Fusce
              interdum imperdiet accumsan. Duis accumsan consequat nibh, et
              suscipit eros mollis eget. Aenean ac est velit. Maecenas risus
              diam, pulvinar a arcu sit amet, elementum vehicula ante. Aenean
              mauris est, congue eu imperdiet vel, volutpat ut ligula.
              Suspendisse sodales non felis in consequat.
            </div>
            <Button
              variant={"outline"}
              className="text-2xl font-medium py-7 mt-10"
            >
              <Link href="/dashboard">GET STARTED</Link>
            </Button>
          </div>
          <div className="hidden lg:block flex-1 relative w-[50%]">
            <Image
              src="/landing-owl.png"
              alt="Descriptive Alt Text"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
