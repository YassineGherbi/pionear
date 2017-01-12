(() => {
	'use strict';

	angular
			.module("offer.service", [])
			.factory("OfferService", OfferService);

	function OfferService($firebaseRef, $firebaseArray, $firebaseObject) {
		const offers = $firebaseArray($firebaseRef.offers);

		const API = {
			getOffers:   getOffers,
			getOffer:    getOffer,
			updateOffer: updateOffer,
			deleteOffer: deleteOffer
		};
		return API;

		function getOffers() {
			return offers;
		}

		function getOffer(id) {
			return $firebaseObject($firebaseRef.offers.child(id));
		}

		function updateOffer(offer) {
			return offer.$save();
		}

		function deleteOffer(offer) {
			return offers.$remove(offer);
		}
	}
})();
