pragma solidity 0.8.0;

import "hardhat/console.sol";

interface IERC165 {
    /**
     * @dev Returns true if this contract implements the interface defined by
     * `interfaceId`. See the corresponding
     * https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section]
     * to learn more about how these ids are created.
     *
     * This function call must use less than 30 000 gas.
     */
    function supportsInterface(bytes4 interfaceId) external view returns (bool);

    function name() external view returns (string memory);
}

contract ERC165 {
    function test() external view returns (bytes4) {
        console.log("test");
        bytes4 a = type(IERC165).interfaceId;
        return a;
    }
}
