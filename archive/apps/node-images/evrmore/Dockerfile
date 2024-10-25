FROM ubuntu:22.04

# install dependencies
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update -y
RUN apt install bsdmainutils git wget build-essential libssl-dev libboost-chrono1.74-dev libboost-filesystem1.74-dev libboost-program-options1.74-dev libboost-system1.74-dev libboost-thread1.74-dev libboost-test1.74-dev qtbase5-dev qttools5-dev bison libexpat1-dev libdbus-1-dev libfontconfig-dev libfreetype-dev libice-dev libsm-dev libx11-dev libxau-dev libxext-dev libevent-dev libxcb1-dev libxkbcommon-dev libminiupnpc-dev libprotobuf-dev libqrencode-dev xcb-proto x11proto-xext-dev x11proto-dev xtrans-dev zlib1g-dev libczmq-dev autoconf automake libtool protobuf-compiler -y

# set up workspace
WORKDIR /

# clone source
RUN git clone https://github.com/EvrmoreOrg/Evrmore /evrmore
WORKDIR /evrmore

# set up database and config
RUN contrib/install_db4.sh ../
RUN ./autogen.sh
ENV BDB_PREFIX=/db4
RUN ./configure BDB_LIBS="-L${BDB_PREFIX}/lib -ldb_cxx-4.8" BDB_CFLAGS="-I${BDB_PREFIX}/include" --prefix=/usr/local

# build and install
RUN make clean \
    && make -j12 \
    && make install

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Adjust permissions
RUN chmod +x /evrmore/src/evrmored
RUN chmod +x /evrmore/src/evrmore-cli
RUN chmod +x /entrypoint.sh

RUN ln -s ./evrmore/src/evrmore-cli /usr/bin/evrmore-cli &&\
    ln -s ./evrmore/src/evrmored /usr/bin/evrmored 

# Expose the default ports
EXPOSE 18700 18766 8767 8766

# Set the entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# Set the command to execute
CMD ["evrmored"]