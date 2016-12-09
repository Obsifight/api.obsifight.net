--
-- Base de données: `obsiapiv6`
--
CREATE DATABASE `obsiapiv6` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `obsiapiv6`;

-- --------------------------------------------------------

--
-- Structure de la table `api_histories`
--

CREATE TABLE IF NOT EXISTS `api_histories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `action` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `accessToken` varchar(255) NOT NULL DEFAULT '',
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `api_users`
--

CREATE TABLE IF NOT EXISTS `api_users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL DEFAULT '',
  `password` varchar(50) NOT NULL DEFAULT '',
  `createdAt` datetime NOT NULL,
  `lastAccess` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
--
-- Base de données: `web_v2`
--
CREATE DATABASE `web_v2` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `web_v2`;

-- --------------------------------------------------------

--
-- Structure de la table `boutique`
--

CREATE TABLE IF NOT EXISTS `boutique` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ordre_id` varchar(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `texte` text NOT NULL,
  `serveur` varchar(20) NOT NULL,
  `commande` varchar(255) NOT NULL,
  `categorie` varchar(255) NOT NULL,
  `prix` int(10) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `historique`
--

CREATE TABLE IF NOT EXISTS `historique` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `joueur` varchar(32) NOT NULL,
  `date_achat` int(255) NOT NULL,
  `nom_offre` varchar(255) NOT NULL,
  `adresse_ip` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `joueurs`
--

CREATE TABLE IF NOT EXISTS `joueurs` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_pseudo` varchar(32) NOT NULL,
  `user_mdp` varchar(40) NOT NULL,
  `user_mail` varchar(100) NOT NULL,
  `user_level` tinyint(1) NOT NULL DEFAULT '0',
  `user_points` int(255) NOT NULL DEFAULT '0',
  `user_skin` tinyint(1) NOT NULL DEFAULT '0',
  `user_cloak` tinyint(1) NOT NULL DEFAULT '0',
  `user_inscription` int(255) NOT NULL,
  `user_derniere_visite` int(255) NOT NULL,
  `sessionId` varchar(255) NOT NULL,
  `user_banni` int(1) NOT NULL DEFAULT '0',
  `vote` int(11) NOT NULL,
  `date_vote` text NOT NULL,
  `friends` text,
  `reponse` varchar(100) DEFAULT NULL,
  `user_cape` tinyint(1) NOT NULL DEFAULT '0',
  `recompenses` int(10) NOT NULL DEFAULT '0',
  `migrer` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_pseudo` (`user_pseudo`),
  UNIQUE KEY `user_mail` (`user_mail`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1985 ;
--
-- Base de données: `web_v3`
--
CREATE DATABASE `web_v3` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `web_v3`;

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `mdp` varchar(50) DEFAULT NULL,
  `actif` int(5) DEFAULT '0',
  `aleatoireChiffres` varchar(30) DEFAULT NULL,
  `dateConnexion` varchar(30) DEFAULT NULL,
  `ipConnexion` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `bloquercode`
--

CREATE TABLE IF NOT EXISTS `bloquercode` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `mail` varchar(150) NOT NULL,
  `pseudo` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `boutique`
--

CREATE TABLE IF NOT EXISTS `boutique` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ordre_id` varchar(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `texte` text NOT NULL,
  `serveur` varchar(20) NOT NULL,
  `commande` varchar(255) NOT NULL,
  `categorie` varchar(255) NOT NULL,
  `prix` int(10) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `boutique_objectif`
--

CREATE TABLE IF NOT EXISTS `boutique_objectif` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `objectif` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `boutique_onglets`
--

CREATE TABLE IF NOT EXISTS `boutique_onglets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `onglet` varchar(50) DEFAULT NULL,
  `serveur` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `channel_ts`
--

CREATE TABLE IF NOT EXISTS `channel_ts` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `channel_name` text NOT NULL,
  `channel_id` int(20) NOT NULL,
  `joueur` varchar(50) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

CREATE TABLE IF NOT EXISTS `commentaires` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_new` int(11) DEFAULT NULL,
  `titre_new` varchar(255) DEFAULT NULL,
  `user_pseudo` varchar(50) DEFAULT NULL,
  `texte` text,
  `date` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `historique`
--

CREATE TABLE IF NOT EXISTS `historique` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `joueur` varchar(32) NOT NULL,
  `date_achat` int(255) NOT NULL,
  `nom_offre` varchar(255) NOT NULL,
  `adresse_ip` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `historique_credit`
--

CREATE TABLE IF NOT EXISTS `historique_credit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `joueur` varchar(32) NOT NULL,
  `date_achat` int(255) NOT NULL,
  `nom_offre` varchar(255) NOT NULL,
  `adresse_ip` varchar(30) NOT NULL,
  `user_points_after` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `historique_echange`
--

CREATE TABLE IF NOT EXISTS `historique_echange` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `joueur` varchar(255) NOT NULL,
  `versjoueur` varchar(255) NOT NULL,
  `nombre_point` int(11) NOT NULL,
  `date_echange` int(15) NOT NULL,
  `adresse_ip` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `joueurs`
--

CREATE TABLE IF NOT EXISTS `joueurs` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `profileid` varchar(255) NOT NULL,
  `user_pseudo` varchar(18) NOT NULL,
  `user_mdp` varchar(64) NOT NULL,
  `user_mail` varchar(100) NOT NULL,
  `user_ip` varchar(128) NOT NULL,
  `web_token` varchar(64) NOT NULL,
  `access_token` varchar(128) NOT NULL,
  `clientToken` varchar(255) NOT NULL,
  `user_level` tinyint(1) NOT NULL DEFAULT '0',
  `user_points` int(255) NOT NULL DEFAULT '0',
  `user_skin` tinyint(1) NOT NULL DEFAULT '0',
  `user_cape` int(1) NOT NULL DEFAULT '0',
  `user_cloak` tinyint(1) NOT NULL DEFAULT '0',
  `user_inscription` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_derniere_visite` int(255) NOT NULL,
  `sessionId` varchar(255) NOT NULL,
  `user_banni` tinyint(1) NOT NULL DEFAULT '0',
  `vote` int(11) NOT NULL DEFAULT '0',
  `date_vote` text NOT NULL,
  `friends` text,
  `reponse` varchar(100) DEFAULT NULL,
  `remboursement` int(1) NOT NULL DEFAULT '0',
  `recompenses` int(10) NOT NULL DEFAULT '0',
  `channel_ts` int(1) NOT NULL DEFAULT '0',
  `bloquer` int(1) NOT NULL DEFAULT '1',
  `mail_confirmed` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_pseudo` (`user_pseudo`),
  UNIQUE KEY `user_mail` (`user_mail`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `mail_confirm`
--

CREATE TABLE IF NOT EXISTS `mail_confirm` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `token` varchar(60) NOT NULL,
  `created` int(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_expediteur` int(11) DEFAULT NULL,
  `id_destinataire` int(11) DEFAULT NULL,
  `date` int(15) DEFAULT NULL,
  `titre` text,
  `message` text,
  `etat` int(5) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(35) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `texte` text,
  `auteur` varchar(50) DEFAULT NULL,
  `img` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(50) NOT NULL,
  `page` text NOT NULL,
  `date` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `paypal`
--

CREATE TABLE IF NOT EXISTS `paypal` (
  `id` int(7) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) DEFAULT NULL,
  `offre` varchar(255) DEFAULT NULL,
  `transaction_number` varchar(255) DEFAULT NULL,
  `informations` text,
  `datas` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `paysafecard`
--

CREATE TABLE IF NOT EXISTS `paysafecard` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `montant` varchar(10) NOT NULL,
  `code` varchar(24) NOT NULL,
  `joueur` varchar(255) NOT NULL,
  `date` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `postit`
--

CREATE TABLE IF NOT EXISTS `postit` (
  `id` int(7) NOT NULL AUTO_INCREMENT,
  `texte` text,
  `date` int(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `probabilites`
--

CREATE TABLE IF NOT EXISTS `probabilites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) DEFAULT NULL,
  `p` varchar(10) DEFAULT NULL,
  `commande` varchar(100) DEFAULT NULL,
  `serveur` varchar(25) DEFAULT NULL,
  `quantite` int(10) DEFAULT NULL,
  `pts_agree` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `req_boutique`
--

CREATE TABLE IF NOT EXISTS `req_boutique` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nbr_achat` int(11) DEFAULT NULL,
  `commande` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `req_credit`
--

CREATE TABLE IF NOT EXISTS `req_credit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nbr_achat` int(11) DEFAULT NULL,
  `commande` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `staff`
--

CREATE TABLE IF NOT EXISTS `staff` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `rang` varchar(30) NOT NULL,
  `pseudo` varchar(50) NOT NULL,
  `age` int(2) NOT NULL,
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `statistiques`
--

CREATE TABLE IF NOT EXISTS `statistiques` (
  `id` int(7) NOT NULL AUTO_INCREMENT,
  `ip` varchar(50) DEFAULT NULL,
  `date` int(15) DEFAULT NULL,
  `page` text,
  `pays` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19928 ;

-- --------------------------------------------------------

--
-- Structure de la table `support`
--

CREATE TABLE IF NOT EXISTS `support` (
  `id` int(7) NOT NULL AUTO_INCREMENT,
  `auteur` varchar(255) DEFAULT NULL,
  `sujet` varchar(255) DEFAULT NULL,
  `message` text,
  `statut` varchar(255) DEFAULT NULL,
  `priorite` varchar(255) DEFAULT NULL,
  `level_priorite` tinyint(5) DEFAULT NULL,
  `date` int(15) DEFAULT NULL,
  `etat` tinyint(2) DEFAULT '0',
  `ip` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `support_reponses`
--

CREATE TABLE IF NOT EXISTS `support_reponses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `overid` int(11) DEFAULT NULL,
  `auteur` varchar(50) DEFAULT NULL,
  `date` int(15) DEFAULT NULL,
  `message` text,
  `admin` varchar(10) DEFAULT NULL,
  `ip` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `ticket_vu`
--

CREATE TABLE IF NOT EXISTS `ticket_vu` (
  `id` int(7) NOT NULL AUTO_INCREMENT,
  `overid` int(7) DEFAULT NULL,
  `staff_lu` tinyint(4) DEFAULT NULL,
  `client_lu` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `tournois_participants`
--

CREATE TABLE IF NOT EXISTS `tournois_participants` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `tournois_scores`
--

CREATE TABLE IF NOT EXISTS `tournois_scores` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `round` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `vote_ip`
--

CREATE TABLE IF NOT EXISTS `vote_ip` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `ip` varchar(20) NOT NULL,
  `date_vote` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
--
-- Base de données: `web_v4`
--
CREATE DATABASE `web_v4` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `web_v4`;

-- --------------------------------------------------------

--
-- Structure de la table `api_configurations`
--

CREATE TABLE IF NOT EXISTS `api_configurations` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `skins` int(1) NOT NULL DEFAULT '0',
  `skin_filename` varchar(150) NOT NULL,
  `skin_free` int(1) NOT NULL DEFAULT '0',
  `capes` int(1) NOT NULL DEFAULT '0',
  `cape_filename` varchar(150) NOT NULL,
  `cape_free` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `api_images`
--

CREATE TABLE IF NOT EXISTS `api_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author` int(11) NOT NULL,
  `base64` longtext NOT NULL,
  `location` text NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `created` datetime NOT NULL,
  `author` varchar(255) NOT NULL,
  `news_id` int(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=192 ;

-- --------------------------------------------------------

--
-- Structure de la table `configurations`
--

CREATE TABLE IF NOT EXISTS `configurations` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `lang` varchar(5) NOT NULL,
  `theme` varchar(50) NOT NULL DEFAULT 'default',
  `layout` varchar(255) NOT NULL,
  `maintenance` text NOT NULL,
  `money_name_singular` varchar(255) NOT NULL,
  `money_name_plural` varchar(255) NOT NULL,
  `server_state` int(1) NOT NULL,
  `server_secretkey` varchar(50) NOT NULL,
  `server_timeout` float NOT NULL,
  `version` varchar(50) NOT NULL,
  `skype` text NOT NULL,
  `youtube` text NOT NULL,
  `twitter` text NOT NULL,
  `facebook` text NOT NULL,
  `mineguard` varchar(5) NOT NULL,
  `banner_server` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `histories`
--

CREATE TABLE IF NOT EXISTS `histories` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `action` varchar(255) NOT NULL,
  `category` varchar(50) NOT NULL,
  `created` datetime NOT NULL,
  `author` varchar(255) NOT NULL,
  `other` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `items`
--

CREATE TABLE IF NOT EXISTS `items` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` int(20) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `servers` text,
  `commands` text NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `category` int(20) NOT NULL,
  `timedCommand` int(1) NOT NULL DEFAULT '0',
  `timedCommand_cmd` text,
  `timedCommand_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE IF NOT EXISTS `likes` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `news_id` int(20) NOT NULL,
  `author` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `lostpasswords`
--

CREATE TABLE IF NOT EXISTS `lostpasswords` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `key` varchar(10) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `navbars`
--

CREATE TABLE IF NOT EXISTS `navbars` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `order` int(2) NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` int(1) NOT NULL DEFAULT '1',
  `url` varchar(250) NOT NULL,
  `submenu` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `comments` int(20) NOT NULL DEFAULT '0',
  `like` int(20) NOT NULL DEFAULT '0',
  `img` varchar(255) NOT NULL,
  `slug` varchar(150) NOT NULL,
  `published` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` longtext NOT NULL,
  `slug` varchar(150) NOT NULL,
  `author` varchar(250) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `partners__partners_list`
--

CREATE TABLE IF NOT EXISTS `partners__partners_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(1) DEFAULT '1',
  `name` varchar(20) NOT NULL,
  `twitter` varchar(100) NOT NULL,
  `facebook` varchar(100) NOT NULL,
  `youtube` varchar(100) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `paypals`
--

CREATE TABLE IF NOT EXISTS `paypals` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` varchar(20) NOT NULL,
  `money` int(20) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `paysafecard_messages`
--

CREATE TABLE IF NOT EXISTS `paysafecard_messages` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `to` varchar(50) NOT NULL,
  `type` int(1) NOT NULL,
  `amount` int(3) NOT NULL,
  `added_points` int(5) NOT NULL,
  `code` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `paysafecards`
--

CREATE TABLE IF NOT EXISTS `paysafecards` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `amount` varchar(3) NOT NULL,
  `code` varchar(20) NOT NULL,
  `author` varchar(50) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `rank` int(1) NOT NULL,
  `permissions` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `plugins`
--

CREATE TABLE IF NOT EXISTS `plugins` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `plugin_id` int(20) NOT NULL,
  `created` datetime NOT NULL,
  `name` varchar(50) NOT NULL,
  `author` varchar(50) NOT NULL,
  `version` varchar(20) NOT NULL,
  `tables` text NOT NULL,
  `state` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `psc_histories`
--

CREATE TABLE IF NOT EXISTS `psc_histories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `to` varchar(50) NOT NULL,
  `accepted` int(11) NOT NULL COMMENT '1 = oui, 0 = non',
  `amount` varchar(20) NOT NULL,
  `added_points` varchar(20) NOT NULL,
  `code` varchar(50) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `ranking_faction_configurations`
--

CREATE TABLE IF NOT EXISTS `ranking_faction_configurations` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cache` int(11) NOT NULL DEFAULT '0',
  `affich` text NOT NULL,
  `calcul_points` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `ranks`
--

CREATE TABLE IF NOT EXISTS `ranks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `rank_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `servers`
--

CREATE TABLE IF NOT EXISTS `servers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '',
  `ip` varchar(20) NOT NULL DEFAULT '',
  `port` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `sliders`
--

CREATE TABLE IF NOT EXISTS `sliders` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `subtitle` text NOT NULL,
  `url_img` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `starpasses`
--

CREATE TABLE IF NOT EXISTS `starpasses` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `money` int(20) NOT NULL,
  `idd` int(5) NOT NULL,
  `idp` int(5) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `teamspeak_channels`
--

CREATE TABLE IF NOT EXISTS `teamspeak_channels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created` datetime NOT NULL,
  `author` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `tournament_players`
--

CREATE TABLE IF NOT EXISTS `tournament_players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `round` int(2) NOT NULL,
  `players` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `session` varchar(255) DEFAULT NULL,
  `rank` int(1) NOT NULL,
  `money` int(20) NOT NULL DEFAULT '0',
  `vote` int(3) NOT NULL DEFAULT '0',
  `ip` varchar(255) NOT NULL,
  `allowed_ip` text NOT NULL,
  `skin` int(1) NOT NULL DEFAULT '0',
  `cape` int(1) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `mail_confirmed` varchar(15) DEFAULT NULL,
  `refunded` int(11) DEFAULT '0',
  `rewards_waited` int(11) DEFAULT NULL,
  `ip_code` varchar(20) DEFAULT NULL,
  `first_init_obsiguard` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `visits`
--

CREATE TABLE IF NOT EXISTS `visits` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `ip` varchar(20) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `referer` text,
  `lang` varchar(4) DEFAULT NULL,
  `navigator` varchar(255) DEFAULT NULL,
  `page` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=193708 ;

-- --------------------------------------------------------

--
-- Structure de la table `vote_configurations`
--

CREATE TABLE IF NOT EXISTS `vote_configurations` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `rewards_type` int(1) NOT NULL DEFAULT '0',
  `rewards` text NOT NULL,
  `websites` text NOT NULL,
  `servers` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `votes`
--

CREATE TABLE IF NOT EXISTS `votes` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `ip` varchar(16) NOT NULL,
  `website` int(11) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1965 ;

-- --------------------------------------------------------

--
-- Structure de la table `vouchers`
--

CREATE TABLE IF NOT EXISTS `vouchers` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `type` int(1) NOT NULL DEFAULT '1',
  `reduction` int(2) NOT NULL,
  `effective_on` text NOT NULL,
  `limit_per_user` int(10) DEFAULT '0',
  `end_date` datetime NOT NULL DEFAULT '2100-01-01 00:00:01',
  `created` datetime NOT NULL,
  `affich` int(1) NOT NULL DEFAULT '1',
  `used` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
--
-- Base de données: `web_v5`
--
CREATE DATABASE `web_v5` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `web_v5`;

-- --------------------------------------------------------

--
-- Structure de la table `api_configurations`
--

CREATE TABLE IF NOT EXISTS `api_configurations` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `skins` int(1) NOT NULL DEFAULT '0',
  `skin_filename` varchar(150) NOT NULL,
  `skin_free` int(1) NOT NULL DEFAULT '0',
  `skin_width` int(11) DEFAULT '64',
  `skin_height` int(11) DEFAULT '32',
  `capes` int(1) NOT NULL DEFAULT '0',
  `cape_filename` varchar(150) NOT NULL,
  `cape_free` int(1) NOT NULL DEFAULT '0',
  `cape_width` int(11) DEFAULT '64',
  `cape_height` int(11) DEFAULT '32',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `cake_sessions`
--

CREATE TABLE IF NOT EXISTS `cake_sessions` (
  `id` varchar(255) NOT NULL,
  `data` text,
  `expires` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `created` datetime NOT NULL,
  `user_id` int(20) NOT NULL,
  `news_id` int(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `configurations`
--

CREATE TABLE IF NOT EXISTS `configurations` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `lang` varchar(5) NOT NULL DEFAULT 'fr',
  `theme` varchar(50) NOT NULL DEFAULT 'default',
  `layout` varchar(255) NOT NULL,
  `maintenance` text NOT NULL,
  `money_name_singular` varchar(255) NOT NULL,
  `money_name_plural` varchar(255) NOT NULL,
  `server_state` int(1) NOT NULL,
  `server_cache` int(1) NOT NULL DEFAULT '0',
  `server_secretkey` varchar(50) NOT NULL,
  `server_timeout` float NOT NULL,
  `version` varchar(50) NOT NULL,
  `skype` text NOT NULL,
  `youtube` text NOT NULL,
  `twitter` text NOT NULL,
  `facebook` text NOT NULL,
  `mineguard` varchar(5) NOT NULL DEFAULT 'false',
  `banner_server` text,
  `email_send_type` int(1) DEFAULT '1' COMMENT '1 = default, 2 = smtp',
  `smtpHost` varchar(30) DEFAULT NULL,
  `smtpUsername` varchar(150) DEFAULT NULL,
  `smtpPort` int(5) DEFAULT NULL,
  `smtpPassword` varchar(100) DEFAULT NULL,
  `google_analytics` varchar(15) DEFAULT NULL,
  `end_layout_code` text,
  `captcha_type` int(1) DEFAULT '1' COMMENT '1 = default, 2 = google',
  `captcha_google_sitekey` varchar(60) DEFAULT NULL,
  `captcha_google_secret` varchar(60) DEFAULT NULL,
  `confirm_mail_signup` int(1) NOT NULL DEFAULT '0',
  `confirm_mail_signup_block` int(1) NOT NULL DEFAULT '0',
  `member_page_type` int(1) NOT NULL DEFAULT '0',
  `passwords_hash` varchar(10) DEFAULT NULL,
  `passwords_salt` int(1) DEFAULT '0',
  `forced_updates` int(1) DEFAULT '1',
  `session_type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `histories`
--

CREATE TABLE IF NOT EXISTS `histories` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `action` varchar(255) NOT NULL,
  `category` varchar(50) NOT NULL,
  `created` datetime NOT NULL,
  `user_id` int(20) NOT NULL,
  `other` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1970 ;

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE IF NOT EXISTS `likes` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `news_id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `login_retries`
--

CREATE TABLE IF NOT EXISTS `login_retries` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `ip` varchar(16) NOT NULL,
  `count` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `lostpasswords`
--

CREATE TABLE IF NOT EXISTS `lostpasswords` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `key` varchar(10) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `navbars`
--

CREATE TABLE IF NOT EXISTS `navbars` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `order` int(2) NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` int(1) NOT NULL DEFAULT '1',
  `url` varchar(250) NOT NULL,
  `submenu` text,
  `open_new_tab` int(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

-- --------------------------------------------------------

--
-- Structure de la table `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `user_id` int(20) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `img` varchar(255) NOT NULL,
  `slug` varchar(150) NOT NULL,
  `published` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `from` int(11) DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `type` varchar(5) NOT NULL DEFAULT 'user',
  `seen` int(1) NOT NULL DEFAULT '0',
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1926 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsi__connection_logs`
--

CREATE TABLE IF NOT EXISTS `obsi__connection_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(16) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1918 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsi__count_players_logs`
--

CREATE TABLE IF NOT EXISTS `obsi__count_players_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `players_online` int(3) NOT NULL,
  `time` int(13) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsi__email_update_histories`
--

CREATE TABLE IF NOT EXISTS `obsi__email_update_histories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `old_email` varchar(50) NOT NULL,
  `new_email` varchar(50) NOT NULL,
  `confirmed_by` int(11) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsi__email_update_request_responses`
--

CREATE TABLE IF NOT EXISTS `obsi__email_update_request_responses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '0 = invalide, 1 = valide',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsi__email_update_requests`
--

CREATE TABLE IF NOT EXISTS `obsi__email_update_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `new_email` varchar(50) NOT NULL,
  `reason` text NOT NULL,
  `ip` varchar(16) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsi__end_events_wins`
--

CREATE TABLE IF NOT EXISTS `obsi__end_events_wins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `faction_name` varchar(30) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsi__factions_rankings`
--

CREATE TABLE IF NOT EXISTS `obsi__factions_rankings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `leader` varchar(50) NOT NULL,
  `kills` int(11) NOT NULL,
  `deaths` int(11) NOT NULL,
  `power` int(11) NOT NULL,
  `ratio` float NOT NULL,
  `golds_pieces` int(11) NOT NULL,
  `end_events` int(11) NOT NULL,
  `kingzombie_events` int(11) NOT NULL,
  `factions_war` int(11) NOT NULL,
  `totems` int(11) NOT NULL,
  `points` float NOT NULL,
  `points_details` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=198 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsi__obsiguard_histories`
--

CREATE TABLE IF NOT EXISTS `obsi__obsiguard_histories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ip` varchar(20) NOT NULL,
  `type` int(2) NOT NULL,
  `obsiguard_ip` varchar(20) DEFAULT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsi__prizes`
--

CREATE TABLE IF NOT EXISTS `obsi__prizes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `commands` text NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=191 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsi__psc_bans`
--

CREATE TABLE IF NOT EXISTS `obsi__psc_bans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsi__psc_quotas`
--

CREATE TABLE IF NOT EXISTS `obsi__psc_quotas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `quota` int(11) NOT NULL,
  `modified` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsi__psc_takeds`
--

CREATE TABLE IF NOT EXISTS `obsi__psc_takeds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `psc_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsi__pseudo_update_histories`
--

CREATE TABLE IF NOT EXISTS `obsi__pseudo_update_histories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `old_pseudo` varchar(16) NOT NULL,
  `new_pseudo` varchar(16) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsi__refund_histories`
--

CREATE TABLE IF NOT EXISTS `obsi__refund_histories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `added_money` int(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1905 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsi__refunds_notifications`
--

CREATE TABLE IF NOT EXISTS `obsi__refunds_notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `refund_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsi__sms_confirmation_codes`
--

CREATE TABLE IF NOT EXISTS `obsi__sms_confirmation_codes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `code` varchar(5) NOT NULL,
  `number_phone` varchar(14) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsi__teamspeak_channels`
--

CREATE TABLE IF NOT EXISTS `obsi__teamspeak_channels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(4) NOT NULL,
  `name` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsivote__configurations`
--

CREATE TABLE IF NOT EXISTS `obsivote__configurations` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `rewards_type` int(1) NOT NULL DEFAULT '0',
  `rewards` text NOT NULL COMMENT 'array php serialize',
  `time_vote` int(3) NOT NULL,
  `vote_url` varchar(150) NOT NULL,
  `out_url` varchar(150) NOT NULL,
  `server_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `obsivote__votes`
--

CREATE TABLE IF NOT EXISTS `obsivote__votes` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(20) NOT NULL,
  `ip` varchar(16) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `slug` varchar(150) NOT NULL,
  `user_id` int(20) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `paysafecard__configs`
--

CREATE TABLE IF NOT EXISTS `paysafecard__configs` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `api_key` varchar(150) NOT NULL,
  `api_env` varchar(10) NOT NULL DEFAULT 'PRODUCTION',
  `currency` varchar(3) NOT NULL DEFAULT 'EUR',
  `default_credits_gived_for_1_as_amount` float NOT NULL DEFAULT '80',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `paysafecard__offers`
--

CREATE TABLE IF NOT EXISTS `paysafecard__offers` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `amount` float NOT NULL,
  `credits` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `paysafecard__payment_histories`
--

CREATE TABLE IF NOT EXISTS `paysafecard__payment_histories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_id` varchar(150) NOT NULL,
  `amount` float NOT NULL,
  `credits_gived` float NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `rank` int(1) NOT NULL,
  `permissions` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `plugins`
--

CREATE TABLE IF NOT EXISTS `plugins` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `apiID` int(20) NOT NULL,
  `created` datetime NOT NULL,
  `name` varchar(50) NOT NULL,
  `author` varchar(50) NOT NULL,
  `version` varchar(20) NOT NULL,
  `tables` text NOT NULL,
  `state` int(1) NOT NULL DEFAULT '1',
  `img` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `ranks`
--

CREATE TABLE IF NOT EXISTS `ranks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `rank_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `servers`
--

CREATE TABLE IF NOT EXISTS `servers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `ip` varchar(120) NOT NULL,
  `port` int(5) NOT NULL,
  `type` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `shop__categories`
--

CREATE TABLE IF NOT EXISTS `shop__categories` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `shop__dedipass_configs`
--

CREATE TABLE IF NOT EXISTS `shop__dedipass_configs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `public_key` varchar(50) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `shop__dedipass_histories`
--

CREATE TABLE IF NOT EXISTS `shop__dedipass_histories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `code` varchar(8) DEFAULT NULL,
  `rate` varchar(30) DEFAULT NULL,
  `credits_gived` varchar(5) DEFAULT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=194 ;

-- --------------------------------------------------------

--
-- Structure de la table `shop__items`
--

CREATE TABLE IF NOT EXISTS `shop__items` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` varchar(20) NOT NULL DEFAULT '',
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `servers` text,
  `commands` text NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `category` int(20) NOT NULL,
  `timedCommand` int(1) NOT NULL DEFAULT '0',
  `timedCommand_cmd` text,
  `timedCommand_time` int(11) DEFAULT NULL,
  `display_server` int(1) DEFAULT '1',
  `need_connect` int(1) DEFAULT '0',
  `display` int(1) DEFAULT '1',
  `multiple_buy` int(1) DEFAULT '0',
  `broadcast_global` int(1) DEFAULT '1',
  `cart` int(1) DEFAULT '0',
  `prerequisites_type` int(1) DEFAULT NULL COMMENT '1= tous les articles, 2 = au moins 1 des articles',
  `prerequisites` text,
  `reductional_items` text,
  `give_skin` int(1) DEFAULT '0',
  `give_cape` int(1) DEFAULT '0',
  `buy_limit` int(11) DEFAULT '0',
  `wait_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `shop__items_buy_histories`
--

CREATE TABLE IF NOT EXISTS `shop__items_buy_histories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `shop__items_configs`
--

CREATE TABLE IF NOT EXISTS `shop__items_configs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `broadcast_global` text,
  `sort_by_server` int(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `shop__paypal_histories`
--

CREATE TABLE IF NOT EXISTS `shop__paypal_histories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `payment_id` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `offer_id` int(11) NOT NULL,
  `payment_amount` varchar(20) NOT NULL,
  `credits_gived` varchar(5) DEFAULT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `shop__paypals`
--

CREATE TABLE IF NOT EXISTS `shop__paypals` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` varchar(20) NOT NULL,
  `money` varchar(20) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `shop__paysafecard_histories`
--

CREATE TABLE IF NOT EXISTS `shop__paysafecard_histories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `amount` varchar(3) NOT NULL,
  `credits_gived` varchar(5) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  `author_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `shop__paysafecard_messages`
--

CREATE TABLE IF NOT EXISTS `shop__paysafecard_messages` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `type` int(1) NOT NULL,
  `amount` int(3) NOT NULL,
  `added_points` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `shop__paysafecards`
--

CREATE TABLE IF NOT EXISTS `shop__paysafecards` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `amount` varchar(3) NOT NULL,
  `code` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `shop__points_transfer_histories`
--

CREATE TABLE IF NOT EXISTS `shop__points_transfer_histories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `points` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `shop__starpass_histories`
--

CREATE TABLE IF NOT EXISTS `shop__starpass_histories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(40) NOT NULL,
  `user_id` int(11) NOT NULL,
  `offer_id` int(11) NOT NULL,
  `credits_gived` varchar(5) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `shop__starpasses`
--

CREATE TABLE IF NOT EXISTS `shop__starpasses` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `money` int(20) NOT NULL,
  `idd` int(5) NOT NULL,
  `idp` int(5) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `shop__vouchers`
--

CREATE TABLE IF NOT EXISTS `shop__vouchers` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `type` int(1) NOT NULL DEFAULT '1',
  `reduction` int(3) NOT NULL,
  `effective_on` text NOT NULL,
  `limit_per_user` int(10) DEFAULT '0',
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime NOT NULL DEFAULT '2100-01-01 00:00:01',
  `created` datetime NOT NULL,
  `affich` int(1) NOT NULL DEFAULT '1',
  `used` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `shop__vouchers_histories`
--

CREATE TABLE IF NOT EXISTS `shop__vouchers_histories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reduction` varchar(3) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `sliders`
--

CREATE TABLE IF NOT EXISTS `sliders` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `subtitle` text NOT NULL,
  `url_img` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `smartlook__configurations`
--

CREATE TABLE IF NOT EXISTS `smartlook__configurations` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `tracking_code` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `social_buttons`
--

CREATE TABLE IF NOT EXISTS `social_buttons` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(20) DEFAULT NULL,
  `img` varchar(120) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `url` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `rank` int(1) NOT NULL,
  `money` varchar(20) NOT NULL DEFAULT '0',
  `vote` int(3) NOT NULL DEFAULT '0',
  `ip` varchar(255) NOT NULL,
  `allowed_ip` text,
  `skin` int(1) NOT NULL DEFAULT '0',
  `cape` int(1) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `rewards_waited` int(11) DEFAULT NULL,
  `confirmed` varchar(25) DEFAULT NULL,
  `obsi-skin_uploaded` int(1) NOT NULL DEFAULT '0',
  `obsi-cape_uploaded` int(1) NOT NULL DEFAULT '0',
  `obsi-number_phone` varchar(12) DEFAULT NULL,
  `obsi-obsiguard_enabled` int(1) NOT NULL DEFAULT '0',
  `obsi-obsiguard_code` varchar(10) DEFAULT NULL,
  `obsi-obsiguard_manage_key` varchar(10) DEFAULT NULL,
  `obsi-can_update_pseudo` int(1) NOT NULL DEFAULT '0',
  `obsivote-kit_to_get` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19234 ;

-- --------------------------------------------------------

--
-- Structure de la table `visits`
--

CREATE TABLE IF NOT EXISTS `visits` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `ip` varchar(20) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `referer` text,
  `lang` varchar(4) DEFAULT 'fr',
  `navigator` varchar(255) DEFAULT NULL,
  `page` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
