import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { NewVideoCreated, NewWatchParty } from "../generated/Muta/Muta"

export function createNewVideoCreatedEvent(
  videocontentId: Bytes,
  creatorAddress: Address,
  videoTimestamp: BigInt,
  videocontentDataCID: string
): NewVideoCreated {
  let newVideoCreatedEvent = changetype<NewVideoCreated>(newMockEvent())

  newVideoCreatedEvent.parameters = new Array()

  newVideoCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "videocontentId",
      ethereum.Value.fromFixedBytes(videocontentId)
    )
  )
  newVideoCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "creatorAddress",
      ethereum.Value.fromAddress(creatorAddress)
    )
  )
  newVideoCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "videoTimestamp",
      ethereum.Value.fromUnsignedBigInt(videoTimestamp)
    )
  )
  newVideoCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "videocontentDataCID",
      ethereum.Value.fromString(videocontentDataCID)
    )
  )

  return newVideoCreatedEvent
}

export function createNewWatchPartyEvent(
  videoID: Bytes,
  attendeeAddress: Address
): NewWatchParty {
  let newWatchPartyEvent = changetype<NewWatchParty>(newMockEvent())

  newWatchPartyEvent.parameters = new Array()

  newWatchPartyEvent.parameters.push(
    new ethereum.EventParam("videoID", ethereum.Value.fromFixedBytes(videoID))
  )
  newWatchPartyEvent.parameters.push(
    new ethereum.EventParam(
      "attendeeAddress",
      ethereum.Value.fromAddress(attendeeAddress)
    )
  )

  return newWatchPartyEvent
}
