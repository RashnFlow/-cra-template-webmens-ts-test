export const bxOpen = (type: string, link: string, params?: any) => {
  console.log(type, link, params);

  if (process.env.NODE_ENV === "production" && !!BX24) {
    switch (type) {
      case "openPath":
        BX24.openPath(link, (res: any) => console.log(res));
        break;
      case "openApplication":
        BX24.openApplication(params, function () {
          // if (cell.updateOnCloseSlider) {
          //   // dispatch(setTimeSliderOpened(Date.now()))
          //   // TODO: Сделать функцию в хуке useData по вызову обновления
          // }
        });
        break;
      case "openLink":
        window.open(link);
        break;
      default:
        break;
    }
  }
}