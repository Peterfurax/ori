import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterMeta"
})
export class FilterPipeMeta implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return (
        item.guestS1.toLowerCase().includes(searchText) |
        item.guestfirstname.toLowerCase().includes(searchText) |
        item.guestname.toLowerCase().includes(searchText) |
        item.guestoccupation.toLowerCase().includes(searchText) |
        item.guestplace.toLowerCase().includes(searchText) |
        item.guesttext.toLowerCase().includes(searchText)
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
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return (
        item.guestS1.toLowerCase().includes(searchText) |
        item.guestfirstname.toLowerCase().includes(searchText) |
        item.guestname.toLowerCase().includes(searchText) |
        item.guestoccupation.toLowerCase().includes(searchText) |
        item.guestplace.toLowerCase().includes(searchText) |
        item.guesttext.toLowerCase().includes(searchText)
      );
    });
  }
}
