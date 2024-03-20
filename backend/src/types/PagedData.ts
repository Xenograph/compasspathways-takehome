export default interface PagedData<T> {
    items: T[];
    more: boolean;
}