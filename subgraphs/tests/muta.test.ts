import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { NewVideoCreated } from "../generated/schema"
import { NewVideoCreated as NewVideoCreatedEvent } from "../generated/Muta/Muta"
import { handleNewVideoCreated } from "../src/muta"
import { createNewVideoCreatedEvent } from "./muta-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let videocontentId = Bytes.fromI32(1234567890)
    let creatorAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let videoTimestamp = BigInt.fromI32(234)
    let videocontentDataCID = "Example string value"
    let newNewVideoCreatedEvent = createNewVideoCreatedEvent(
      videocontentId,
      creatorAddress,
      videoTimestamp,
      videocontentDataCID
    )
    handleNewVideoCreated(newNewVideoCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewVideoCreated created and stored", () => {
    assert.entityCount("NewVideoCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewVideoCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "videocontentId",
      "1234567890"
    )
    assert.fieldEquals(
      "NewVideoCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "creatorAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "NewVideoCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "videoTimestamp",
      "234"
    )
    assert.fieldEquals(
      "NewVideoCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "videocontentDataCID",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
