          {listFolder.map((item, index) => {
            return (
              <div
                key={`listItem__BoxCards-Card ${index}`}
                className={cx("listItem__BoxCards-Card")}
                onClick={() => handleLinktoProductDetail(item.folderName)}
              >
                <div className={cx("Card__Img")}>
                  <img src={logo} />
                </div>
                <div className={cx("Card__Card__Information")}>
                  {/* CardTitle */}
                  <div className={cx("Card__Card__Information CardTitle")}>
                    <span>
                      {item.name} - {item.id}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}