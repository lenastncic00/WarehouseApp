import styled from "styled-components/native";
import { StatusBar } from "react-native";

export const Container = styled.SafeAreaView`
    flex: 1;
    width: 100%;
	height: '100%';
	align-items: center;
	background-color: #fff;
	padding-top: ${StatusBar.currentHeight}px;
`