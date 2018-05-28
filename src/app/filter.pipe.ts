import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterMeta"
})
export class FilterPipeMeta implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    console.log("FilterPipe");
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return (
        it.guestS1.toLowerCase().includes(searchText) |
        it.guestfirstname.toLowerCase().includes(searchText) |
        it.guestname.toLowerCase().includes(searchText) |
        it.guestoccupation.toLowerCase().includes(searchText) |
        it.guestplace.toLowerCase().includes(searchText) |
        it.guesttext.toLowerCase().includes(searchText)
      );
    });
  }
}

@Pipe({
  name: "filterSend"
})
export class FilterPipeSend implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    console.log("FilterPipeSend");
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      console.log(it);
      return (
        it.guestS1.toLowerCase().includes(searchText) |
        it.guestfirstname.toLowerCase().includes(searchText) |
        it.guestname.toLowerCase().includes(searchText) |
        it.guestoccupation.toLowerCase().includes(searchText) |
        it.guestplace.toLowerCase().includes(searchText) |
        it.guesttext.toLowerCase().includes(searchText)
      );
    });
  }
}
