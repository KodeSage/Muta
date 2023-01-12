/** @format */
import {
	Address,
	ipfs,
	json,
	Bytes,
	dataSource,
} from "@graphprotocol/graph-ts";
import {
	NewVideoCreated as NewVideoCreatedEvent,
	NewWatchParty as NewWatchPartyEvent,
} from "../generated/Muta/Muta";
import {
	VideoEvent,
	Account,
	JoinWatchParty,
	VideoEventMetadata,
} from "../generated/schema";
import { integer } from "@protofire/subgraph-toolkit";
import { VideoEventMetadata as VideoEventMetadataTemplate } from "../generated/templates";

export function handleNewVideoCreated(event: NewVideoCreatedEvent): void {
	let newvideoEvent = VideoEvent.load(event.params.videocontentId.toHex());
	if (newvideoEvent == null) {
		newvideoEvent = new VideoEvent(event.params.videocontentId.toHex());
		newvideoEvent.videocontentId = event.params.videocontentId;
		newvideoEvent.videoeventOwner = event.params.creatorAddress;
		newvideoEvent.maxWatchCapacity = event.params.maxWatchCapacity;
		newvideoEvent.totalJoinedWatchParties = integer.ZERO;
		const videoIpfsHash = event.params.videocontentDataCID + "/data.json";
		newvideoEvent.ipfsURI = videoIpfsHash;
		VideoEventMetadataTemplate.create(videoIpfsHash);
		newvideoEvent.save();
	}
}

function fetchOrCreateAccount(address: Address): Account {
	let account = Account.load(address.toHex());
	if (account == null) {
		account = new Account(address.toHex());
		account.totalJoinedWatchParties = integer.ZERO;
		account.save();
	}
	return account;
}

export function handleNewWatchParty(event: NewWatchPartyEvent): void {
	let id = event.params.videoID.toHex() + event.params.attendeeAddress.toHex();
	let newJoinwatchparty = JoinWatchParty.load(id);
	let account = fetchOrCreateAccount(event.params.attendeeAddress);
	let thisVideoEvent = VideoEvent.load(event.params.videoID.toHex());
	if (newJoinwatchparty == null && thisVideoEvent != null) {
		newJoinwatchparty = new JoinWatchParty(id);
		newJoinwatchparty.attendee = account.id;
		newJoinwatchparty.videoevent = thisVideoEvent.id;
		newJoinwatchparty.save();
		thisVideoEvent.totalJoinedWatchParties = integer.increment(
			thisVideoEvent.totalJoinedWatchParties
		);
		thisVideoEvent.save();
		account.totalJoinedWatchParties = integer.increment(
			account.totalJoinedWatchParties
		);
		account.save();
	}
}

export function handleMetadata(content: Bytes): void {
	let videoMetadata = new VideoEventMetadata(dataSource.stringParam());
	const value = json.fromBytes(content).toObject();
	if (value) {
		const image = value.get("image");
		const name = value.get("name");
		const description = value.get("description");
		const arweavelink = value.get("arweavelink");

		if (name && image && description && arweavelink) {
			videoMetadata.name = name.toString();
			videoMetadata.image = image.toString();
			videoMetadata.arweavelink = arweavelink.toString();
			videoMetadata.description = description.toString();
		}

		videoMetadata.save();
	}
}
