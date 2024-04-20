import Head from "next/head";
import React from "react";

function formatTimestamp(timestamp: number) {
    const date = new Date(timestamp)
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
    }
    return date.toLocaleString(undefined, options)
}

export default function Page() {
    return (
        <>
            <Head>
                <title>Terms of Service</title>
                <meta property="og:title" content="Terms of Service"/>
                <meta name="description" content="The boring stuff."/>
            </Head>

            <div className="flex justify-center">
                <div className="p-5 max-w-prose">
                    <h1 className="text-5xl font-bold tracking-tight text-secondary-1">Terms of Service</h1>
                    <p className="text-secondary-4 text-sm mb-5">Last updated: {formatTimestamp(1713612684858)}</p>

                    <p className="text-secondary-3 leading-relaxed">Welcome to my texture pack site! Please read these Terms of Service ("Terms")
                        carefully before using my website (the "Service") operated by me ("I", "me", or "my").
                        <br/>
                        Accessing and using the Service is subject to your acceptance of and compliance with these Terms. These Terms apply to all
                        visitors, users, and others who access or use the Service.
                        <br/>
                        By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, then you
                        may
                        not access the Service.
                    </p>

                    <h2 className="text-2xl font-bold tracking-tight text-secondary-2 mt-10 mb-5">1. Privacy Policy</h2>
                    <p className="text-secondary-3 leading-relaxed">Your privacy is important to me. It is my policy to respect your privacy regarding
                        any
                        information that may be collected from you across my website.</p>

                    <h2 className="text-2xl font-bold tracking-tight text-secondary-2 mt-10 mb-5">1.1 Information Collection and Use</h2>
                    <p className="text-secondary-3 leading-relaxed">I do not store any personal information on my own servers or hard drives. However,
                        third-party services such as Google may collect and store data through cookies to enhance your experience and provide targeted
                        advertising. This information is collected and stored by these third parties and is subject to their respective privacy
                        policies.</p>

                    <h2 className="text-2xl font-bold tracking-tight text-secondary-2 mt-10 mb-5">1.2 Cookies</h2>
                    <p className="text-secondary-3 leading-relaxed">My website does not directly store cookies on your device. However, third-party
                        services such as Google AdSense may place cookies on your browser to collect information and serve personalized ads based on
                        your
                        interests and browsing history. These cookies are subject to the privacy policies of the respective third-party services.
                        <br/>
                        While I do not have control over these cookies, you have the option to manage or delete them through your browser settings.
                        Please
                        note that disabling cookies may impact your experience on my website and limit certain functionalities.
                        <br/>
                        Please review the privacy policies of these third-party services for more information on how they handle data collected
                        through
                        cookies.
                    </p>

                    <h2 className="text-2xl font-bold tracking-tight text-secondary-2 mt-10 mb-5">2. Changes to Terms of Service</h2>
                    <p className="text-secondary-3 leading-relaxed">I reserve the right, at my sole discretion, to modify or replace these Terms at
                        any
                        time. Changes to the Terms of Service will go into effect immediately upon posting on this page without prior notice. By
                        continuing to access or use my Service after the changes become effective, you agree to be bound by the revised terms. If you
                        do
                        not agree to the new terms, please stop using the Service.</p>

                    <h2 className="text-2xl font-bold tracking-tight text-secondary-2 mt-10 mb-5">3. Contact Me</h2>
                    <p className="text-secondary-3 leading-relaxed">If you have any questions about these Terms, please try to contact
                        me <a href="https://discord.gg/nG4uKuB" className="underline hover:text-blue-500 transition-colors">via Discord</a> in the
                        first
                        instance. If it's a matter that cannot be discussed on Discord, I will provide you with my email address there.</p>
                </div>
            </div>
        </>
    )
}