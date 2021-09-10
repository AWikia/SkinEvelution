<?php
 use MediaWiki\User\UserOptionsLookup;
 use Html;
 use MediaWiki\MediaWikiServices;
 use Sanitizer;
 use TextContent;
 use User;
 use wAvatar;


/* Code From Universal Omega's Cosmos Skin */
class EvelutionSocialProfile {
	/**
	 * @param string $user
	 * @return User|null
	 */
	private static function getUser( $user ) {
		$services = MediaWikiServices::getInstance();

		$titleFactory = $services->getTitleFactory();
		$title = $titleFactory->newFromText( $user );

		if (
			is_object( $title ) &&
			( $title->getNamespace() == NS_USER || $title->getNamespace() == NS_USER_PROFILE ) &&
			!$title->isSubpage()
		) {
			$user = $title->getText();
		}

		$userFactory = $services->getUserFactory();
		$user = $userFactory->newFromName( $user );

		return $user;
	}
}


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
        $data["html-editcount"] = SiteStats::edits();
        $data["html-usercount"] = SiteStats::users();
        $data["msg-evelution-pages"] = wfMessage( 'evelution-pages' )->numParams( SiteStats::articles() )->parse(); //Overwrite the message so it respects plural forms
        $data["msg-evelution-files"] = wfMessage( 'evelution-files' )->numParams( SiteStats::images() )->parse();
        $data["msg-evelution-edits"] = wfMessage( 'evelution-edits' )->numParams( SiteStats::edits() )->parse();
        $data["msg-evelution-users"] = wfMessage( 'evelution-users' )->numParams( SiteStats::users() )->parse();
        $data["msg-evelution-activity-module"] = wfMessage( 'evelution-activity-module' )->inContentLanguage()->parseAsBlock(); // Additional JS is used
        $data["msg-evelution-about-module-info"] = wfMessage( 'evelution-about-module-info' )->inContentLanguage()->parseAsBlock();
        $data["html-rc-link"] = Title::newFromText( 'Special:RecentChanges' )->getLocalURL();
        $data["html-files-link"] = Title::newFromText( 'Special:NewFiles' )->getLocalURL();
        $data["html-css-link"] = Title::newFromText( 'MediaWiki:Evelution.css' )->getLocalURL();
        $data["html-js-link"] = Title::newFromText( 'MediaWiki:Evelution.js' )->getLocalURL();
        $data["html-spages-link"] = Title::newFromText( 'Special:SpecialPages' )->getLocalURL();
        $data["html-notices-link"] = Title::newFromText( 'Special:Notifications' )->getLocalURL();
        $data["html-logs-link"] = Title::newFromText( 'Special:Logs' )->getLocalURL();
        $data["html-upload-link"] = Title::newFromText( 'Special:Upload' )->getLocalURL();
        $data["html-rpage-link"] = Title::newFromText( 'Special:Random' )->getLocalURL();
        $data["html-whatlinks-link"] = Title::newFromText( 'Special:WhatLinksHere' )->getLocalURL();
        $data["html-info-link"] = Title::newFromText( 'Special:PageInfo' )->getLocalURL();
        $data["html-history-link"] = Title::newFromText( 'Special:PageHistory' )->getLocalURL();
        $data["html-mcontent-link"] = Title::newFromText( 'Special:ChangeContentModel' )->getLocalURL();
        $data["html-edit-link"] = Title::newFromText( 'Special:Edit' )->getLocalURL();
        $data["html-longpages-link"] = Title::newFromText( 'Special:LongPages' )->getLocalURL();
        $data["html-unusedtemplates-link"] = Title::newFromText( 'Special:UnusedTemplates' )->getLocalURL();
        $data["html-apisandbox-link"] = Title::newFromText( 'Special:APISandbox' )->getLocalURL();
        $data["html-messages-link"] = Title::newFromText( 'Special:AllMessages' )->getLocalURL();
        $data["html-linkedactivity-link"] = Title::newFromText( 'Special:RecentChangesLinked' )->getLocalURL();
        $data["html-export-link"] = Title::newFromText( 'Special:Export' )->getLocalURL();
        $data["html-import-link"] = Title::newFromText( 'Special:Import' )->getLocalURL();
        $data["html-stats-link"] = Title::newFromText( 'Special:Statistics' )->getLocalURL();
        $data["html-allpages-link"] = Title::newFromText( 'Special:AllPages' )->getLocalURL();
        $data["html-designer-link"] = Title::newFromText( 'CPE ThemeDesigner' )->getLocalURL();
        if ( class_exists( 'wAvatar' ) ) {
			$avatar = new wAvatar( $this->getSkin()->getUser()
				->getId(), 'l' );
			$avatarElement = $avatar->getAvatarURL();
		} else {
			$avatarElement = '<span class="cpe-icon material-icons">account_circle</span>';
		}
		$data["html-avatar"] = $avatarElement;
        return $data;
    }
}



class EvelutionHooks {
	public static function onResourceLoaderGetConfigVars( array &$vars, string $skin, Config $config ) {
		$vars['wgEvelution'] = [
			'LeftPersonalLinks' => $config->get( 'EvelutionLeftPersonalLinks' ),
			'DisableColorManagement' => $config->get( 'EvelutionDisableColorManagement' ),
			'ForceOneHeader' => $config->get( 'EvelutionForceOneHeader' ),
			'DisableRightRail' => $config->get( 'EvelutionDisableRightRail' ),
			'ServerMode' => $config->get( 'EvelutionServerMode' ),
			'CustomFont' => $config->get( 'EvelutionCustomFont' ),
			'StickyRail' => $config->get( 'EvelutionStickyRail' ),
		];

		return true;
	}
}