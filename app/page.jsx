import Feed from "@components/Feed"

const page = () => {
  return (
    <section className="w-full flex-center flex-col ">
        <h1 className="head_text text-center">
            Discover and Share 
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center"> AI Powered Prompts</span>
        </h1>
        <p className="desc text-center">
            Promptmania is an open-source platform to discover, create and share interesting AI Prompts.
        </p>

        <Feed />
    </section>
  )
}

export default page