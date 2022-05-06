/**
 * 简单封装一层 SQL 语句。支持链式调用。
 */
export declare class SQL {
	private sql
	constructor()
	static create(): SQL
	/**
	 * 调用此方法表示 SQL 语句拼接结束，返回完整的 query 字符串。
	 */
	end(): string
	/**
	 * 由于封装的 mysql 方法覆盖不到所有 SQL 语句，所以此 API 允许直接拼接 SQL 语句。
	 * @param sql 自定义的 SQL 语句
	 */
	native(sql: string): this
	/**
	 * SELECT
	 * @param args
	 */
	select(...args: string[]): this
	/**
	 * FROM
	 * @param table
	 */
	from(table: string): this
	/**
	 * WHERE
	 */
	where(): this
	/**
	 * =
	 * @param a
	 * @param b
	 */
	equal(key: string, value: unknown): this
	/**
	 * LIKE
	 * @param value
	 * @param keywords
	 */
	like(value: string, keywords: string): this
	/**
	 * OR
	 */
	or(): this
	/**
	 * LIMIT
	 * @param condition
	 */
	limit(condition?: number): this
	/**
	 * UPDATE
	 * @param table
	 */
	update(table: string): this
	/**
	 * SET
	 * @param values
	 */
	set(values: Record<string, unknown>): this
	/**
	 * INSERT INTO
	 * @param table
	 */
	insertInto(table: string): this
	/**
	 * ORDER BY
	 * @param key
	 */
	orderBy(key: string): this
	/**
	 * DESC
	 */
	desc(): this
	/**
	 * ASC
	 */
	asc(): this
	/**
	 * DELETE
	 */
	delete(): this
	/**
	 * CREATE TABLE
	 * @param tableName
	 * @param column
	 */
	createTable(tableName: string, column: string[]): this
}
export declare function createSQL(): SQL
