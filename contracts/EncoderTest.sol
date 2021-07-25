pragma solidity 0.8.0;

contract EncoderTest {
    struct Data {
        uint128 num1;
        uint128 num2;
        uint256[] ref1;
        uint256[] ref2;
    }

    mapping(address => Data) public datas;

    constructor(
        address id,
        uint128 num1,
        uint128 num2,
        uint256[] memory ref1,
        uint256[] memory ref2
    ) {
        datas[id] = Data({
            num1: num1,
            num2: num2,
            ref1: ref1,
            ref2: ref2
        });
    }

    function ref1 (address id, uint256 index) external view returns (uint256) {
        return datas[id].ref1[index];
    }

    function ref2 (address id, uint256 index) external view returns (uint256) {
        return datas[id].ref2[index];
    }
}
