// ==UserScript==
// @name           9anime Downloader
// @namespace      https://greasyfork.org/en/users/957626-fantasy-boss
// @homepageURL    https://github.com/Fantasy-Boss/9anime-Downloader
// @supportURL     https://github.com/Fantasy-Boss/9anime-Downloader/issues/new
// @version        1.0.2
// @description    9anime Scrapper and Downloader
// @author         Fantasy Boss
// @icon           https://www.google.com/s2/favicons?domain=9anime.id
// @match          *://9anime.vc/watch/*
// @match          *://9anime.se/watch/*
// @match          *://9anime.pe/watch/*
// @match          https://ninjashare.to/download/*
// @match          https://sbembed.com/*
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_deleteValue
// @grant          GM_openInTab
// @grant          window.close
// @require        https://code.jquery.com/jquery-3.6.1.min.js
// @compatible     chrome
// @compatible     firefox
// @run-at         document-end
// @license        MIT License
// ==/UserScript==


(function() {
    'use strict';


      //\\//\\//\\//\\//\\//\\//\\//\\\//\\//\\//\\//\\//
     //    Change This Settings To Your Preference    //
    //\\//\\//\\//\\//\\//\\//\\//\\\//\\//\\//\\//\\//


    // Type false , if you don't use IDM (Internet Download Manager)
    var use_IDM = true // IDM is highly recommended  for this script

    // Change your IDM installation folder path here [ if necessary ]
    var IDM_Folder = `C:/Program Files (x86)/Internet Download Manager` // Change the "\" to "/"

    // Video Download Quality
    // High Quality [1920x1080] - (1080p) = 1
    // Normal Quality [1280x720] - (720p) = 2
    // Low Quality [640x360] - (360p) = 3
    var Quality = 2 // Default 720p

    // Subbed Episodes = 1
    // Dubbed Episodes = 2
    var download_Type = 2 // Dubbed as Default





      //\\//\\//\\//\\//\\//\\//\\//\\\//\\//\\//\\//\\//
     //         Don't edit anything from here         //
    //\\//\\//\\//\\//\\//\\//\\//\\\//\\//\\//\\//\\//


    window.addEventListener('load', async() => {
        var Copy = async(TextToCopy)=> {
            var TempText = document.createElement("input");
            TempText.value = TextToCopy;
            document.body.appendChild(TempText);
            TempText.select();
            document.execCommand("copy");
            document.body.removeChild(TempText);
        }

        if (location.href.match('ninjashare.to/download/') !== null)
        {
            let a_tags = $("#main-wrapper > div > div > div > div.dc-main > div.block-button.text-center > div.download-list > div.download-list-ul a")
            a_tags.map(async(i) => {
                if (($(a_tags[i]).attr('href')).match('streamsb.com') !== null || ($(a_tags[i]).attr('href')).match('sbembed.com') !== null) {
                    await GM_setValue("9anime-post-data-ninjashare", $(a_tags[i]).attr('href'))
                }
            })
            setTimeout(function() {
                    location.href = "#"
                    window.close();
            }, 300);
        } else if (location.href.match('sbembed') !== null)
        {
            if ($("#F1 > button") !== null) {
                $("#F1 > button").click()
                setInterval(()=> {$("#F1 > button").click()}, 4000)
                setInterval(()=> {location.reload()}, 10000)
            }
            if ($("#container > div table") !== null) {
                $("#container > div > table a").map((i)=> {
                    if (Quality === 1) {
                        if ($(`#container > div > table > tbody > tr:nth-child(${i+2}) > td:nth-child(1) > a`).text() === "High quality") {
                            $(`#container > div > table > tbody > tr:nth-child(${i+2}) > td:nth-child(1) > a`).click()
                        }
                    }
                    if (Quality === 2) {
                        if ($(`#container > div > table > tbody > tr:nth-child(${i+2}) > td:nth-child(1) > a`).text() === "Normal quality") {
                            $(`#container > div > table > tbody > tr:nth-child(${i+2}) > td:nth-child(1) > a`).click()
                        }
                    }
                    if (Quality === 3) {
                        if ($(`#container > div > table > tbody > tr:nth-child(${i+2}) > td:nth-child(1) > a`).text() === "Low quality") {
                            $(`#container > div > table > tbody > tr:nth-child(${i+2}) > td:nth-child(1) > a`).click()
                        }
                    }
                })
                setTimeout(()=> {$(`#container > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > a`).click()}, 3000)
            }
            if ($("#container > div > span > a") !== null && $("#container > div > span > a").text() === "Download Video") {
                let msg = $("#container > div > span > a").attr('href')
                await GM_setValue("9anime-post-data-sbembed", msg)
                setTimeout(function() {
                    location.href = "#"
                    window.close();
                }, 300);

            }
        } else if (location.href.match('9anime') !== null) {

            GM_addStyle(`#main-content > div.player-servers{height:150px;user-select:none}#servers-content > div.ps_-status{display:flex;flex-direction:column;justify-content:space-evenly;align-items:center}#my-label{font-size:large;color:#4aff13;}#grabber-type{width:38%;background:#1c1c1c;color:#777;outline:none;font-size:small;text-align:center;padding:5px 10px;border-radius:.25rem;transition:all .2s}#my-start-btn,#real-down-btn{background:#6829c1;color:#eee;cursor:pointer;padding:5px 10px;border-radius:.25rem;transition:all .2s;margin:3px 0;transform:scale(1.15);width:32%;text-align: center;}#my-start-btn:active,#real-down-btn:active{background:#8a8a8a}.disable{pointer-events:none}.lds-ring{display:inline-block;position:relative;width:10px;height:10px;margin-bottom:1px}.lds-ring div{box-sizing:border-box;display:block;position:absolute;width:6px;height:6px;border:6px solid #fff;border-radius:50%;animation:lds-ring 1.2s cubic-bezier(0.5,0,0.5,1) infinite;border-color:#fff transparent transparent}.lds-ring div:nth-child(1){animation-delay:-.45s}.lds-ring div:nth-child(2){animation-delay:-.3s}.lds-ring div:nth-child(3){animation-delay:-.15s}@keyframes lds-ring{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}#servers-content #my-progress{width:100%;height:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;}#servers-content #progress-text {font-size:30px;text-align:center;width:100%;margin-bottom:25px;transition:all 500ms;}#servers-content #progress-bar-back {width:80%;height:20px;border-radius:50px;overflow:hidden;background-color:gray;}#servers-content #progress-bar-front{background-color:rgb(13, 255, 25);height:100%;width:0%;border-radius:inherit;transition:all 500ms;}`)

            let loadingGif = `data:image/gif;base64,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`

            let type_html = `<select id="grabber-type"><option value="sub" ${download_Type === 1? 'selected': ''}>Sub</option><option value="dub" ${download_Type === 2? 'selected': ''}>Dub</option></select>`
            let btn = `<div id="my-start-btn"><img width="100%" src="${loadingGif}"></div>`
            let html = type_html + btn
            let loading = false
            var wait = ((ms)=> {return new Promise((res, rej) => {setTimeout(() => res(), ms)})})


            setInterval(async()=> {
                if ($('#servers-content > div.ps_-status#my-content').is(":visible") === false) {
                    $('#servers-content > div.ps_-status').attr("id", "my-content")
                    $('#servers-content > div.ps_-status').html(html)

                    if (loading) {
                        $('#servers-content > div.ps_-status #grabber-type').hide()
                        $('#servers-content > div.ps_-status #my-start-btn').html(`<img width="100%" src="${loadingGif}">`)
                        $('#servers-content > div.ps_-status #my-start-btn').addClass('disable')
                    } else $('#servers-content > div.ps_-status #my-start-btn').html(`START`)

                    // start button click
                    $('#servers-content > div.ps_-status #my-start-btn').click(async()=> {
                        var sure = true
                        var ep_num = 1
                        var last_ep_num = parseInt($("#episodes-page-1 > a:nth-last-child(2)").text())
                        if ($("#episodes-page-1 > a:nth-child(1)").attr('class').match('active') === null ) {
                            ep_num = parseInt($("#episodes-page-1 > a.active").text())
                            let con_text = ((last_ep_num-ep_num) >= 1 ? `Do you want to download from Episode ${ep_num} - Episode ${last_ep_num}`: `Do you want to download only Episode ${ep_num}`)
                            sure = confirm(con_text)
                         }

                        if (sure) {
                            let type = $('#servers-content > div.ps_-status #grabber-type').val()
                            if ($(`#servers-content > div.ps_-block.ps_-block-sub.servers-${type} > div.ps__-list > div:nth-child(1)`).is(":visible")) {
                                loading = true
                                $('#servers-content > div.ps_-status #grabber-type').hide()
                                $('#servers-content > div.ps_-status #my-start-btn').html(`<img width="100%" src="${loadingGif}">`)
                                $('#servers-content > div.ps_-status #my-start-btn').addClass('disable')
                                let ninjaCopy = async()=> {
                                    await GM_deleteValue("9anime-post-data-ninjashare")
                                    while(true) {
                                        await wait(100)
                                        let ninjashare = await GM_getValue("9anime-post-data-ninjashare", "")
                                        if (ninjashare !== "") {
                                            GM_openInTab(ninjashare);
                                            await GM_deleteValue("9anime-post-data-ninjashare")
                                        }
                                    }
                                };
                                ninjaCopy()

                                let title = $(`#main-content > section.block_area.block_area-detail > div > div > div.film-infor > div.film-infor-top > h2`).text()
                                title = (((title.replace(/[<>?\/|\\*]/g, " ")).replace(/:/g, "-")).replace(/"/g, "'")).trim()
                                let epCount = (last_ep_num+1) - ep_num


                                // get embed video links
                                $(`#servers-content > div.ps_-block.ps_-block-sub.servers-${type} > div.ps__-list > div:nth-child(1)`).click()
                                await wait(3000)
                                let urls = []
                                for (let i = 1; i <= epCount; i++) {
                                    if ($(`#servers-content > div.ps_-block.ps_-block-sub.servers-${type}`).is(":visible")) {
                                        let id = (($('#iframe-embed').attr('src')).replace("https://rapid-cloud.co/embed-6/", '')).substring(0,12)
                                        let link = `https://rapid-cloud.co/embed/a-download/` + id
                                        urls.push(link)

                                        nextEpisode()
                                        await wait(3000)
                                    } else break
                                }


                                let scrapperProgress = 0
                                let lastProgress = 0

                                let animateValue = async (start, end, duration) => {
                                    let startTimestamp = null;
                                    const step = (timestamp) => {
                                        if (!startTimestamp) startTimestamp = timestamp;
                                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                                        $('#servers-content #progress-text').text(Math.floor(progress * (end - start) + start) + '%')
                                        if (progress < 1) {
                                            window.requestAnimationFrame(step);
                                        }
                                    };
                                    window.requestAnimationFrame(step);
                                    lastProgress = scrapperProgress
                                }
                                let progressHtml = `<div id="my-progress">
                                        <div id="progress-text">0%</div>
                                        <div id="progress-bar-back">
                                            <div id="progress-bar-front"></div>
                                        </div>
                                    </div>`
                                $('#servers-content .ps_-block').remove()
                                $('#servers-content').append(progressHtml)

                                // Get download links
                                let data = []
                                await GM_deleteValue("9anime-post-data-sbembed")
                                for (let i = 1; i <= urls.length; i++) {
                                    let url = (urls[(i-1)])
                                    GM_openInTab(url)
                                    while(true) {
                                        await wait(100)
                                        let value = await GM_getValue("9anime-post-data-sbembed", "")
                                        if (value !== "") {
                                            let ep = { ep: ep_num, name: `Episode_${ep_num}_.mp4`, url: value }
                                            ep_num++
                                            data.push(ep)
                                            await GM_deleteValue("9anime-post-data-sbembed")
                                            break
                                        }
                                    }
                                    // Progress Bar
                                    scrapperProgress = Math.round((100/urls.length) * i)
                                    if (scrapperProgress <= 100) {
                                        $('#servers-content #progress-bar-front').css('width', `${scrapperProgress}%`)
                                        animateValue(lastProgress, scrapperProgress, 500);
                                        // lastProgress = lastProgress > 0 ? scrapperProgress - lastProgress : 0
                                    }
                                }


                                // create One click queue for IDM
                                if (data.length > 0) {
                                    let code = `@echo off \ncolor 2 \n@echo. \n@echo Created on ${(new Date(Date.now())).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})} \n@echo. \n"${IDM_Folder.replace(/\//g, "\\")}\\IDMan.exe" \n`
                                    for (let i = 1; i <= data.length; i++) {
                                        code += `"${IDM_Folder.replace(/\//g, "\\")}\\IDMan.exe" /a /f "${title}\\${data[(i-1)].name}" /d "${data[(i-1)].url}"\n`
                                    }

                                    let url = ''
                                    if (use_IDM) url = URL.createObjectURL(new Blob([(code)], {type: "application/octet-stream"}));
                                    else url = URL.createObjectURL(new Blob([(JSON.stringify(data))], {type: "application/json"}));
                                    let ready = `<label id="my-label" for="My Download">Ready</label><a title="My Download" id="real-down-btn" href="${url}" download="Downloader - ${title}${use_IDM? ".bat": ".json"}">Download</a>`
                                    loading = false
                                    $('#servers-content > div.ps_-status').html(ready)
                                } else {
                                    let ready = `<label id="my-label">Error</label>`
                                    $('#servers-content > div.ps_-status').html(ready)
                                }
                            } else alert(`${type[0].toUpperCase()}ub for this anime is not available`)
                        }
                    })
                }
            }, 1)
        } else console.log('Unknown Host')
    }, false);
})();







