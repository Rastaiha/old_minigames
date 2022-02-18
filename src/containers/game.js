import React, { Component } from 'react';
import { Redirect } from 'react-router';

import GameTheoryGraph from './games/GameTheoryGraph';
import GeoGebra from './games/GeoGebra/GeoGebra';
import FirstCodingGame from './games/CodingGame/FirstCodingGame';
import SecondCodingGame from './games/CodingGame/SecondCodingGame';
import CodingGrid from './games/CodingGame/CodingGrid';
import FirstBoxesContainer from './games/AlgorithmGames/FirstBoxesContainer';
import SecondBoxesContainer from './games/AlgorithmGames/SecondBoxesContainer';
import VerticalLines from './games/CodingGame/VerticalLines';
import DummiesGame from './games/AlgorithmGames/DummiesGame';
import DormGame from './games/GameTheoryGames/DormGame';
import gameTypes from './games/gameTypes';
import PipelinePane from './games/AlgorithmGames/PipelinePane';
import RentRoom from './games/GameTheoryGames/RentRoom';
import XSoali from './games/CodingGame/CodingXSoali';
import SelfDrivingCar1 from './games/AIGames/SelfDrivingCar1';
import SelfDrivingCar2 from './games/AIGames/SelfDrivingCar2';
import FreeFallGame from './games/PhysicGames/FreeFallGame';
import SpaceGame from './games/PhysicGames/SpaceGame';
import Hash from './games/BlockChain/HashPane';
import Block from './games/BlockChain/BlockPane';
import BlockChain from './games/BlockChain/BlockChainPane';
import MessageGame from './games/BlockChain/MessageGame';
import SecondPipelineGraph from './games/AlgorithmGames/SecondPipelineGraph';
import Map from './games/PhysicGames/Map';
import FirstStreetGraph from './games/GameTheoryGames/FirstStreetGraph';
import SecondStreetGraph from './games/GameTheoryGames/SecondStreetGraph';
import ThirdStreetGraph from './games/GameTheoryGames/ThirdStreetGraph';
import Auction from './games/GameTheoryGames/Auction';

export default class Game extends Component {
  render() {
    switch (this.props.match.params.id) {
      case gameTypes.FIRST_TRAFFIC_GAME.type:
        return <FirstStreetGraph />;
      case gameTypes.SECOND_TRAFFIC_GAME.type:
        return <SecondStreetGraph />;
      case gameTypes.THIRD_TRAFFIC_GAME.type:
        return <ThirdStreetGraph />;
      case gameTypes.MAP_GAME.type:
        return <Map />;
      case gameTypes.STREET_GRAPH.type:
        return <GameTheoryGraph />;
      case gameTypes.PIPELINE_GRAPH.type:
        return <PipelinePane />;
      case gameTypes.SECOND_PIPELINE_GRAPH.type:
        return <SecondPipelineGraph />;
      case gameTypes.GEOGEBRA.type:
        return <GeoGebra />;
      case gameTypes.FIRST_CODING_GAME.type:
        return <FirstCodingGame />;
      case gameTypes.SECOND_CODING_GAME.type:
        return <SecondCodingGame />;
      case gameTypes.X_QUESTIONS.type:
        return <XSoali />;
      case gameTypes.RENT_ROOM.type:
        return <RentRoom />;
      case gameTypes.GRID.type:
        return <CodingGrid />;
      case gameTypes.FIRST_BOX_GAME.type:
        return <FirstBoxesContainer />;
      case gameTypes.SECOND_BOX_GAME.type:
        return <SecondBoxesContainer />;
      case gameTypes.VERTICAL_LINES.type:
        return <VerticalLines />;
      case gameTypes.DUMMIES_GAME.type:
        return <DummiesGame />;
      case gameTypes.DORM_GAME.type:
        return <DormGame />;
      case gameTypes.FIRST_DRIVIING_CAR.type:
        return <SelfDrivingCar1 />;
      case gameTypes.SECOND_DRIVIING_CAR.type:
        return <SelfDrivingCar2 />;
      case gameTypes.FREE_FALL.type:
        return <FreeFallGame />;
      case gameTypes.SPACE_GAME.type:
        return <SpaceGame />;
      case gameTypes.HASH.type:
        return <Hash />;
      case gameTypes.BLOCK.type:
        return <Block />;
      case gameTypes.BLOCKCHAIN.type:
        return <BlockChain />;
      case gameTypes.MESSAGE_GAME.type:
        return <MessageGame />;
      case gameTypes.AUCTION_GAME1.type:
        return <Auction values={[30, 60, 95]} auction_pay_type={1} />;
      case gameTypes.AUCTION_GAME2.type:
        return <Auction values={[60, 82, 80]} auction_pay_type={1} />;
      case gameTypes.AUCTION_GAME3.type:
        return <Auction values={[95, 90, 93]} auction_pay_type={1} />;
      case gameTypes.AUCTION_GAME4.type:
        return <Auction values={[30, 55, 90]} auction_pay_type={1} />;
      default:
        return <Redirect to="/" />;
    }
  }
}
