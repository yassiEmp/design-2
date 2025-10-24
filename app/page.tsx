import { Space_Grotesk } from "next/font/google";
import showcase1 from '@/public/showcase-1.png'
import showcase2 from '@/public/showcase-2.png'
import showcase3 from '@/public/showcase-3.png'
import Carousel from "@/componants/Carousel";
const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});
const images = [showcase1, showcase2, showcase3]
export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center bg-background overflow-x-hidden">
      <p className="text-foreground font-medium mt-2">Experience <span className={" text-black font-semibold " + grotesk.className}>Makeover</span></p>
      <h1 className={grotesk.className + " font-semibold text-6xl text-center tracking-tight max-w-3xl mt-4"} style={{ wordSpacing: .5 }}>Design as rare as <br /> catching butterflies or finding a four-leaf clover.</h1>
      <div className="bg-secondary w-8/10 max-w-[700px] rounded-4xl p-8 mt-12">
        <h2 className="text-3xl text-center font-bold">
          Apps. Websites. Brand. Products.
        </h2>
        <div className="w-full h-[400px] mt-6 anch">
          <Carousel images={images} />
        </div>
        <FaqComp question="What is the cost" response="$6000/month" />
        <FaqComp question="When will you receive updates" response="Daily or later if the design needs more time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
        <FaqComp question="How many design" response="unlimited One request at the time" />
      </div>
    </main>
  );
}


type FaqProps = { question: string, response: string }
function FaqComp({ question, response }: FaqProps) {
  return <div className="pt-5 w-full border-b border-secondary-foreground/40 flex gap-2 items-center pb-4">
    <p className="text-md font-semibold ">{question} ? <span className="text-md font-semibold text-secondary-foreground">{response}</span></p>

  </div>
}