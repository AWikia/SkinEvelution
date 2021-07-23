<?php

use SiteStats;

class SkinEvelution extends SkinMustache {
    /**
     * Extends the getTemplateData function to add a template key 'html-myskin-hello-world'
     * which can be rendered in skin.mustache using {{{html-myskin-hello-world}}
     */
    public function getTemplateData() {
        $data = parent::getTemplateData();
        $data["html-mainurl"] = "/wiki/index.php/"; // URL
        $data["html-titlealt"] =  $this->getOutput()->getTitle(); // Page Title
        $data["html-articlecount"] = SiteStats::articles();
        $data["html-filecount"] = SiteStats::images();
        $data["msg-eve-pages"] = wfMessage( 'eve-pages' )->numParams( SiteStats::articles() )->parse(); //Overwrite the message so it respects plural forms
        $data["msg-eve-files"] = wfMessage( 'eve-files' )->numParams( SiteStats::articles() )->parse();
        $data["html-rc-link"] = Title::newFromText( 'Special:RecentChanges' )->getLocalURL();
        $data["html-files-link"] = Title::newFromText( 'Special:NewFiles' )->getLocalURL();
        $data["html-css-link"] = Title::newFromText( 'MediaWiki:Common.css' )->getLocalURL();
        $data["html-js-link"] = Title::newFromText( 'MediaWiki:Common.js' )->getLocalURL();
        $data["html-spages-link"] = Title::newFromText( 'Special:SpecialPages' )->getLocalURL();
        $data["html-notices-link"] = Title::newFromText( 'Special:Notifications' )->getLocalURL();
        $data["html-logs-link"] = Title::newFromText( 'Special:Logs' )->getLocalURL();
        $data["html-upload-link"] = Title::newFromText( 'Special:Upload' )->getLocalURL();
        $data["html-rpage-link"] = Title::newFromText( 'Special:Random' )->getLocalURL();
        $data["html-whatlinks-link"] = Title::newFromText( 'Special:WhatLinksHere' )->getLocalURL();
        $data["html-info-link"] = Title::newFromText( 'Special:PageInfo' )->getLocalURL();
        $data["html-history-link"] = Title::newFromText( 'Special:PageHistory' )->getLocalURL();
        $data["html-mcontent-link"] = Title::newFromText( 'Special:ChangeContentModel' )->getLocalURL();
        return $data;
    }
}
