import React, { useEffect, useState } from 'react';
import { Launcher } from 'popup-chat-react'
import "./Chatbot.css"
import { useSelector, useDispatch } from 'react-redux';
import { allData, getSocket } from '../../redux/dataSlice/dataSlice';
import uuid from 'react-uuid'
import useSocket from '../../Hooks/useSocket';
import { getRandomOptions } from '../../utilities/bighead';
import { faker } from '@faker-js/faker';
// import monsterImgUrl from '../../images/banner-1.jpg'

function Chatbot() {
    const { socket } = useSocket();
    const data = useSelector(allData);
    const [id, setId] = useState();
    const [newMessagesCount, setNewMessagesCount] = useState(0);
    const [createUser, setCreateUser] = useState({});
    const [state, setState] = useState({
        messageList: [],
        isOpen: false,
        fileUpload: true,
    });
    //get id and init socket 
    const initSocket = () => {
        const getChatId = localStorage.getItem("chatId");
        const userInfo = localStorage.getItem("user");

        if (!getChatId) {
            const createId = uuid();
            const createAvatar = getRandomOptions();
            const randomName = faker.name.findName();
            setCreateUser({ avatar: createAvatar, displayName: randomName, });
            localStorage.setItem("chatId", JSON.stringify(createId));
            localStorage.setItem("user", JSON.stringify({ displayName: randomName, avatar: createAvatar }));
            console.log('if', createId);
            return createId;
        }
        else {
            const initialId = JSON.parse(getChatId);
            const parseUserInfo = JSON.parse(userInfo);
            setCreateUser(parseUserInfo);
            console.log('else', getChatId);
            return initialId;
        }

    }
    // main working of socket 
    useEffect(() => {
        const id = initSocket();
        setId(id);
    }, [])
    useEffect(() => {
        if (id) {
            console.log(id, 'dfdkfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');
            console.log({ id, ...createUser });
            socket.emit('join', { id, ...createUser });
            socket.on("get-message", message => {
                console.log(message, 'bot')
                !state.isOpen && setNewMessagesCount(state => state + 1);
                console.log(message);
                sendMessage(message.data.text)
            });
        }
        return () => {
            socket.emit('leave', id);
        }
    }, [id]);
    setTimeout(() => { },)
    function onMessageWasSent(message) {
        socket.emit('message', { ...message, displayName: createUser.displayName, avatar: createUser.avatar, id, time: `${new Date()}` })

        setState(state => ({
            ...state,
            messageList: [...state.messageList, message]
        }));
        if (state.messageList?.length === 0) {
            sendMessage("Thanks For you question. will reply soon")
        }
    }
    // this is a test 
    function onFilesSelected(fileList) {
        const objectURL = window.URL.createObjectURL(fileList[0]);

        setState(state => ({
            ...state,
            messageList: [
                ...state.messageList,
                {
                    type: 'file', author: 'me',
                    data: {
                        url: objectURL,
                        fileName: fileList[0].name,
                    }
                }
            ]
        }));
    }

    function sendMessage(text) {
        if (text.length > 0) {
            setState(state => ({
                ...state,
                messageList: [
                    ...state.messageList,
                    {
                        author: 'them',
                        type: 'text',
                        data: { text }
                    }
                ]
            }));
        }
    }

    function onClick() {
        setNewMessagesCount(0)
        setState(state => ({
            ...state,
            isOpen: !state.isOpen,
        }));
    }
    console.log(newMessagesCount);

    return (
        <div >
            <Launcher
                agentProfile={{
                    teamName: 'Service A2Z',
                    imageUrl: 'https://i.ibb.co/s5CQTKg/a-z.png'
                }}
                onMessageWasSent={onMessageWasSent}
                onFilesSelected={onFilesSelected}
                messageList={state.messageList}
                newMessagesCount={newMessagesCount}
                onClick={onClick}
                isOpen={state.isOpen}
                pinMessage={{
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfpbuR_LA9RbFgYICWUb9R0bg3NQyhy5cs5w&usqp=CAU',
                    title: 'Welcome to Service A2Z ',
                    text: 'Asked any question we will answer soon'
                }}
                showEmoji
                fileUpload={state.fileUpload}
                placeholder='asked question'
            />
        </div>
    );
}
export default Chatbot;