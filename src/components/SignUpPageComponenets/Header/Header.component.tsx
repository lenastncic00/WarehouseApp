import { View, Text } from 'react-native'
import React from 'react'
import { HeaderComponent, PageTitle, IconWrapper, ArrowIcon, PlaceholderView } from './Header.style'
import { NavigationProp } from '@react-navigation/native'

const Header = ({ navigation }: { navigation: NavigationProp<ReactNavigation.RootParamList>
	 | {canGoBack: Function; goBack: Function; } | undefined}) => {
  return (
		<HeaderComponent>
			<IconWrapper
				onPress={() => {
					if (navigation?.canGoBack()) {
						navigation?.goBack()
					}
				}}
			>
				<ArrowIcon
					name='left'
					color='#fff'
					size={24}
				/>
			</IconWrapper>
			<PageTitle>Create account</PageTitle>
			<PlaceholderView />
		</HeaderComponent>
	);
}

export default Header