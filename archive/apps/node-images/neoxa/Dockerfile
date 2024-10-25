FROM ubuntu:22.04

# install dependencies
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update -y
RUN apt install bsdmainutils git wget build-essential g++ libssl-dev libboost-chrono1.74-dev libboost-filesystem1.74-dev libboost-program-options1.74-dev libboost-system1.74-dev libboost-thread1.74-dev libboost-test1.74-dev qtbase5-dev qttools5-dev bison libexpat1-dev libdbus-1-dev libfontconfig-dev libfreetype-dev libice-dev libsm-dev libx11-dev libxau-dev libxext-dev libevent-dev libxcb1-dev libxkbcommon-dev libminiupnpc-dev libprotobuf-dev libqrencode-dev xcb-proto x11proto-xext-dev x11proto-dev xtrans-dev zlib1g-dev libczmq-dev autoconf automake libtool protobuf-compiler -y

# set up workspace
WORKDIR /

# clone source
RUN git clone https://github.com/NeoxaChain/Neoxa /neoxa
WORKDIR /neoxa

# set up database and config
RUN ./autogen.sh \
    && ./configure --with-gui=no --disable-tests --disable-bench --disable-zmq --disable-wallet

# build and install
RUN make clean \
    && make -j12 \
    && make install

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Adjust permissions
RUN chmod +x /neoxa/src/meowcoind
RUN chmod +x /neoxa/src/meowcoin-cli
RUN chmod +x /entrypoint.sh

RUN ln -s ./neoxa/src/meowcoin-cli /usr/bin/meowcoin-cli &&\
    ln -s ./neoxa/src/meowcoind /usr/bin/meowcoind 

# Expose the default ports
EXPOSE 15419 8788 15425 4572

# Set the entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# Set the command to execute
CMD ["meowcoind"]