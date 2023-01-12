import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import { NewVideoCreated, NewWatchParty } from "../generated/Muta/Muta"

export function createNewVideoCreatedEvent(
  videocontentId: Bytes,
  maxWatchCapacity: BigInt,
  creatorAddress: Address,
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
      "maxWatchCapacity",
      ethereum.Value.fromUnsignedBigInt(maxWatchCapacity)
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
