/** @format */

import {
	NewVideoCreated as NewVideoCreatedEvent,
	NewWatchParty as NewWatchPartyEvent,
} from "../generated/Muta/Muta";
import { NewVideoCreated, NewWatchParty } from "../generated/schema";

export function handleNewVideoCreated(event: NewVideoCreatedEvent): void {
	let entity = new NewVideoCreated(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	
		entity.videocontentId = event.params.videocontentId;
		entity.creatorAddress = event.params.creatorAddress;
		entity.videoTimestamp = event.params.videoTimestamp;
		entity.videocontentDataCID = event.params.videocontentDataCID;

		entity.blockNumber = event.block.number;
		entity.blockTimestamp = event.block.timestamp;
		entity.transactionHash = event.transaction.hash;


	entity.save();
}

export function handleNewWatchParty(event: NewWatchPartyEvent): void {
	let entity = new NewWatchParty(
		event.transaction.hash.concatI32(event.logIndex.toI32())
	);
	entity.videoID = event.params.videoID;
	entity.attendeeAddress = event.params.attendeeAddress;

	entity.blockNumber = event.block.number;
	entity.blockTimestamp = event.block.timestamp;
	entity.transactionHash = event.transaction.hash;

	entity.save();
}
