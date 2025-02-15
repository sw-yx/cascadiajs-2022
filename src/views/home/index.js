let Layout = require('../layout')

module.exports = async function Index(ticket) {
    let clientID = process.env.GITHUB_CLIENT_ID
    let { full_name, number } = ticket
    let content = /*html*/`
        <div id=page>
            <div class=page-title><div><h1>Hello ${ full_name }!</h1></div></div>
            <div id="home" class="page-body narrow">
                <h2>Conference Directory</h2>
                ${ ticket.github && ticket.github !== ''
                    ? /*html*/`<p>You have been added to the Conference Directory ✅<p>
                    <h2>Virtual Ticket</h2>
                    <p><img src="${ process.env.BEGIN_STATIC_ORIGIN }/ticket-${ number }.png" alt="image of virtual ticket" width="500"/></p>
                    <p>Anyone who registers via your virtual ticket page gets 10% off!</p>
                    <p>
                        <a target="_blank" href="https://twitter.com/intent/tweet?text=${ encodeURIComponent(`I just bought a ticket to #CascadiaJS 2022! If you register using my virtual ticket link, you'll save 10%!\n\nhttps://2022.cascadiajs.com/tickets/${ number }`) }">Share on Twitter</a> 
                        <a target="_blank" href="/tickets/${ number }">Direct Link</a>
                    </p>
                    `
                    : /*html*/`<p>Let folks know you're attending CascadiaJS this year! We use <a target="_blank" href="https://docs.github.com/en/developers/apps/building-github-apps/authenticating-with-github-apps">Github OAuth</a> to retrieve your profile photo and add it to our Conference Directory. We will also generate a customized virtual ticket that will include a discount code for you to share with your friends!</p>
                    <div class="cta secondary"><a href="https://github.com/login/oauth/authorize?client_id=${ clientID }">Get Added to Directory</a></div>`
                }
                <h2>Need Help?</h2>
                <p>Please contact us in the <a target="_blank" href="https://discord.gg/cascadiajs">Discord</a> at #help-questions.</p>
                <form action=/home method=post>
                    <input type=hidden name=reset value=reset/>
                    <button>Log Out</button>
                </form>
            </div>
        </div>
    `
    let html = Layout({ content })
    return { html }
}
