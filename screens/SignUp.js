import React, { useState, useEffect } from 'react'
import {
    View, 
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Modal,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from 'react-native'

import LinearGradient from "react-native-linear-gradient"
import { Colors } from 'react-native/Libraries/NewAppScreen'

import {icons, images, COLORS, SIZES, FONTS} from "../constants"

const SignUp = ({ navigation }) => {

    // States
    const [showPassword, setShowPassword] = useState(false)

    const [areas, setAreas] = useState([])
    const [selectedArea, setSelectedArea] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        fetch('https://restcountries.eu/rest/v2/all')
        .then(res => res.json())
        .then(data => {
            let areaData = data.map(item => {
                return {
                    code: item.alpha2Code,
                    name: item.name,
                    callingCode: `+${item.callingCodes[0]}`,
                    flag: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`
                }
            })

            setAreas(areaData)

            if(areaData.length > 0){
                let defaultData = areaData.filter(a => a.code === 'US')

                if (defaultData.length > 0) {
                    setSelectedArea(defaultData[0])
                }
            }
        })

    }, [])

    // renderHeader
    const renderHeader = () => (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: SIZES.padding * 6,
                paddingHorizontal: SIZES.padding * 2,
            }}
            onPress={() => console.log('Sign up')}
        >
            <Image
                source={icons.back}
                resizeMode='contain'
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.white
                }}
            />
            <Text
                style={{
                    marginLeft: SIZES.padding * 1.5,
                    color: COLORS.white,
                    ...FONTS.h4
                }}
            >Sign Up</Text>
        </TouchableOpacity>
    )

    // renderLogo
    const renderLogo = () => (
        <View
            style={{
                marginTop: SIZES.padding * 5,
                height: 100,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Image
            source={images.wallieLogo}
            resizeMode='contain'
            style={{
                width: '60%'
            }}
        />
        </View>
    )

    // renderForm
    const renderForm = () => (
        <View
            style={{
                marginTop: SIZES.padding * 3,
                marginHorizontal: SIZES.padding * 3
            }}
        >
            {/* Full Name */}
            <View
                style={{
                    marginTop: SIZES.padding * 3
                }}
            >
                <Text
                    style={{
                        color: COLORS.lightGreen,
                        ...FONTS.body3
                    }}
                >Full Name</Text>
                <TextInput
                    style={{
                        marginVertical: SIZES.padding,
                        borderBottomColor: COLORS.white,
                        borderBottomWidth: 1,
                        height: 40,
                        color: COLORS.white,
                        ...FONTS.body3
                    }}
                    placeholder="Enter Full Name"
                    placeholderTextColor={COLORS.lightGray}
                    keyboardAppearance='dark'
                    selectionColor={COLORS.white}
                />
            </View>
            
            {/* Phone Code */}
            <View
                style={{
                    marginTop: SIZES.padding * 2
                }}
            >
                <Text
                    style={{
                        color: COLORS.lightGreen,
                        ...FONTS.body3
                    }}
                >Phone Number</Text>
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    {/* Country Code */}
                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 50,
                            marginHorizontal: 5,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            ...FONTS.body2
                        }}
                        onPress={() => setModalVisible(true)}
                    >
                        <View
                            style={{
                                justifyContent: 'center'
                            }}
                        >
                            <Image source={icons.down} style={{
                                width: 10,
                                height: 10,
                                tintColor: COLORS.white
                            }}/>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                marginLeft: 5
                            }}
                        >
                            <Image source={{ uri: selectedArea?.flag }} style={{
                                width: 30,
                                height: 30,
                                resizeMode: 'contain'
                            }}/>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                marginLeft: 5
                            }}
                        >
                            <Text style={{
                                color: COLORS.white,
                                ...FONTS.body3
                            }}>{selectedArea?.callingCode}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Phone Number */}
                <TextInput
                    style={{
                        flex: 1,
                        marginVertical: SIZES.padding,
                        borderBottomColor: COLORS.white,
                        borderBottomWidth: 1,
                        height: 40,
                        color: COLORS.white,
                        ...FONTS.body3
                    }}
                    placeholder='Enter Phone Number'
                    placeholderTextColor={COLORS.white}
                    selectionColor={COLORS.white}
                    keyboardAppearance='dark'
                    keyboardType='phone-pad'
                />
                </View>
            </View>
            
            {/* Password */}
            <View style={{
                marginTop: SIZES.padding * 2
            }}>
                <Text
                    style={{
                        color: COLORS.lightGreen,
                        ...FONTS.body3
                    }}
                >Password</Text>
                <TextInput
                    style={{
                        flex: 1,
                        marginVertical: SIZES.padding,
                        borderBottomColor: COLORS.white,
                        borderBottomWidth: 1,
                        height: 40,
                        color: COLORS.white,
                        ...FONTS.body3
                    }}
                    placeholder='Enter Password'
                    placeholderTextColor={COLORS.white}
                    selectionColor={COLORS.white}
                    secureTextEntry={!showPassword}
                    keyboardAppearance='dark'
                />
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 10,
                        height: 30,
                        width: 30
                    }}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Image
                        source={showPassword ? icons.disable_eye : icons.eye}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.white
                        }}
                    />
                </TouchableOpacity>
            </View>
            
        </View>
    )

    // renderButton
    const renderButton = () => (
        <View style={{
            margin: SIZES.padding * 3
        }}>
            <TouchableOpacity
                style={{
                    height: 60,
                    backgroundColor: COLORS.black,
                    borderRadius: SIZES.radius,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={() => navigation.navigate('Home')}
            >
                <Text
                    style={{
                        color: COLORS.white,
                        ...FONTS.body3
                    }}
                >Continue</Text>
            </TouchableOpacity>
        </View>
    )

    // renderAreaCodesModal
    const renderAreaCodesModal = () => {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        flexDirection: 'row',
                    }}
                    onPress={() => {
                        setSelectedArea(item)
                        setModalVisible(false)
                    }}
                >
                    <Image
                        source={{ uri: item.flag }}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body3 }}>{item.name}</Text>
                </TouchableOpacity>
            )
        }

        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View
                            style={{
                                height: 400,
                                width: SIZES.width * 0.8,
                                backgroundColor: COLORS.lightGreen,
                                borderRadius: SIZES.radius
                            }}
                        >
                            <FlatList
                                data={areas}
                                renderItem={renderItem}
                                keyExtractor={item => item.code}
                                showsVerticalScrollIndicator={false}
                                style={{
                                    padding: SIZES.padding * 2,
                                    marginBottom: SIZES.padding * 2
                                }}
                            >

                            </FlatList>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }



    // SignUp Screen View
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{
                flex: 1
            }}
        >
            <LinearGradient
                colors={[COLORS.lime, COLORS.emerald]}
                style={{
                    flex: 1
                }}
            >
                <ScrollView>
                    {renderHeader()}
                    {renderLogo()}
                    {renderForm()}
                    {renderButton()}
                </ScrollView>
            </LinearGradient>

            {renderAreaCodesModal()}
        </KeyboardAvoidingView>
    )
}

export default SignUp
